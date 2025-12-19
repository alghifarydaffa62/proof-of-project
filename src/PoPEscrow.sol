// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract PoPEscrow {
    using SafeERC20 for IERC20;

    IERC20 public usdyToken;

    struct Milestone {
        string description;
        uint256 amount;
    }

    struct Project {
        string name;
        string documentLink;
        address client;
        address vendor;
        uint256 totalAmount;
        uint256 amountPaid;
        bool isCompleted;
        Milestone[] milestones;
        uint256 currentMilestoneIndex;
    }

    Project[] public projects;

    event ProjectCreated(uint256 indexed projectId, string name, uint256 value);
    event MilestoneApproved(uint256 indexed projectId, string stepName, uint256 amountReleased);

    constructor(address _usdyAddress) {
        usdyToken = IERC20(_usdyAddress);
    }

    function createProject(
        string memory _name,
        string memory _documentLink,
        address _vendor,
        string[] memory _milestoneNames,
        uint256[] memory _milestoneAmounts
    ) external {
        require(_vendor != address(0), "Invalid vendor address");
        require(bytes(_name).length > 0, "Invalid name!");
        require(bytes(_documentLink).length > 0, "Invalid document link!");
        require(_milestoneNames.length == _milestoneAmounts.length, "Invalid name and milestoens");
        require(_milestoneNames.length > 0, "Invalid milestones name");

        uint256 totalProjectValue = 0;
        for (uint256 i = 0; i < _milestoneAmounts.length; i++) {
            totalProjectValue += _milestoneAmounts[i];
        }

        require(totalProjectValue > 0, "Total nilai proyek tidak boleh 0");

        usdyToken.safeTransferFrom(msg.sender, address(this), totalProjectValue);

        uint256 newProjectId = projects.length;
        projects.push();
        Project storage project = projects[newProjectId];

        project.name = _name;
        project.documentLink = _documentLink;
        project.client = msg.sender;
        project.vendor = _vendor;
        project.totalAmount = totalProjectValue;
        project.amountPaid = 0;
        project.currentMilestoneIndex = 0;
        project.isCompleted = false;

        for (uint256 i = 0; i < _milestoneNames.length; i++) {
            project.milestones.push(Milestone({description: _milestoneNames[i], amount: _milestoneAmounts[i]}));
        }

        emit ProjectCreated(newProjectId, _name, totalProjectValue);
    }

    function ApproveMileStone(uint256 _projectId) external {
        Project storage project = projects[_projectId];

        require(msg.sender == project.client, "Only Client!");
        require(!project.isCompleted, "Project already completed!");

        uint256 currentIndex = project.currentMilestoneIndex;
        Milestone storage currentStep = project.milestones[currentIndex];

        uint256 amountToRelease = currentStep.amount;

        project.amountPaid += amountToRelease;
        usdyToken.safeTransfer(project.vendor, amountToRelease);

        emit MilestoneApproved(_projectId, currentStep.description, amountToRelease);

        if (currentIndex + 1 < project.milestones.length) {
            project.currentMilestoneIndex += 1;
        } else {
            project.isCompleted = true;
        }
    }

    function getCurrentMilestone(uint256 _projectId) external view returns (string memory description, uint256 amount) {
        Project storage proj = projects[_projectId];
        if (proj.isCompleted) {
            return ("Completed", 0);
        }
        Milestone storage m = proj.milestones[proj.currentMilestoneIndex];
        return (m.description, m.amount);
    }

    function getProjectCount() external view returns (uint256) {
        return projects.length;
    }

    function getProjectDetails(uint256 _projectId) external view returns (Project memory) {
        return projects[_projectId];
    }
}
