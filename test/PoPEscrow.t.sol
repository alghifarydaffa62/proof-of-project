// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {PoPEscrow} from "../src/PoPEscrow.sol";
import {MockUSDY} from "../src/MockUSDY.sol";

contract PoPEscrowTest is Test {
    PoPEscrow public escrow;
    MockUSDY public token;

    address public client = makeAddr("client");
    address public vendor = makeAddr("vendor");
    address public hacker = makeAddr("hacker");

    string[] public milestoneNames;
    uint256[] public milestoneAmounts;

    function setUp() public {
        token = new MockUSDY();
        escrow = new PoPEscrow(address(token));

        token.transfer(client, 10000 * 10 ** 18);

        vm.startPrank(client);
        token.approve(address(escrow), 1000000 * 10 ** 18);
        vm.stopPrank();

        milestoneNames.push("Milestone 1: DP & Delivery");
        milestoneAmounts.push(300 * 10 ** 18);

        milestoneNames.push("Milestone 2: Installation Final");
        milestoneAmounts.push(700 * 10 ** 18);
    }

    function testCreateProject() public {
        vm.startPrank(client);

        escrow.createProject(
            "Project Instalasi Jaringan", "https://docs.google.com/spk.pdf", vendor, milestoneNames, milestoneAmounts
        );

        assertEq(token.balanceOf(client), 9000 * 10 ** 18);
        assertEq(token.balanceOf(address(escrow)), 1000 * 10 ** 18);

        uint256[] memory clientProjs = escrow.getMyClientProjects(client);
        assertEq(clientProjs.length, 1);

        vm.stopPrank();
    }

    function testFullPaymentFlow() public {
        vm.prank(client);
        escrow.createProject("Project A", "link", vendor, milestoneNames, milestoneAmounts);

        vm.prank(client);
        escrow.ApproveMileStone(0);
        assertEq(token.balanceOf(vendor), 300 * 10 ** 18);

        vm.prank(client);
        escrow.ApproveMileStone(0);
        assertEq(token.balanceOf(vendor), 1000 * 10 ** 18);

        PoPEscrow.Project memory p = escrow.getProjectDetails(0);
        assertEq(p.isCompleted, true);
    }

    function testHackerCannotApprove() public {
        vm.prank(client);
        escrow.createProject("Project A", "link", vendor, milestoneNames, milestoneAmounts);

        vm.prank(hacker);
        vm.expectRevert("Only Client!");
        escrow.ApproveMileStone(0);
    }

    function testRevertInvalidVendor() public {
        vm.startPrank(client);
        vm.expectRevert("Invalid vendor address");

        escrow.createProject("Project A", "link", address(0), milestoneNames, milestoneAmounts);
        vm.stopPrank();
    }

    function testRevertInvalidName() public {
        vm.startPrank(client);
        vm.expectRevert("Invalid name!");

        escrow.createProject("", "link", vendor, milestoneNames, milestoneAmounts);
        vm.stopPrank();
    }

    function testRevertInvalidLink() public {
        vm.startPrank(client);
        vm.expectRevert("Invalid document link!");

        escrow.createProject("Project A", "", vendor, milestoneNames, milestoneAmounts);
        vm.stopPrank();
    }

    function testRevertArrayMismatch() public {
        vm.startPrank(client);

        string[] memory badNames = new string[](2);
        badNames[0] = "M1";
        badNames[1] = "M2";

        uint256[] memory badAmounts = new uint256[](1);
        badAmounts[0] = 100;

        vm.expectRevert("Invalid name and milestoens");

        escrow.createProject("Project A", "link", vendor, badNames, badAmounts);
        vm.stopPrank();
    }

    function testRevertZeroValue() public {
        vm.startPrank(client);

        uint256[] memory zeroAmounts = new uint256[](2);
        zeroAmounts[0] = 0;
        zeroAmounts[1] = 0;

        vm.expectRevert("Total nilai proyek tidak boleh 0");

        escrow.createProject("Project A", "link", vendor, milestoneNames, zeroAmounts);
        vm.stopPrank();
    }

    function testRevertAlreadyCompleted() public {
        vm.startPrank(client);
        escrow.createProject("Project A", "link", vendor, milestoneNames, milestoneAmounts);

        escrow.ApproveMileStone(0);
        escrow.ApproveMileStone(0);

        vm.expectRevert("Project already completed!");
        escrow.ApproveMileStone(0);

        vm.stopPrank();
    }
}
