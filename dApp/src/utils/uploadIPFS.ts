import axios from "axios";

const JWT = import.meta.env.VITE_PINATA_JWT
const GATEWAY = import.meta.env.VITE_PINATA_GATEWAY

export const uploadIPFS = async (file: File): Promise<string | null> => {
    if(!file) return null;

    try {
        const formData = new FormData()
        formData.append("file", file)

        const metadata = JSON.stringify({
            name: `PoP_Project_${Date.now()}_${file.name}`,
        })
        formData.append("pinataMetadata", metadata)

        const options = JSON.stringify({
            cidVersion: 0,
        })
        formData.append("pinataOptions", options)

        const res = await axios.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${JWT}`
                }
            }
        )

        const ipfsHash = res.data.IpfsHash
        const url = `https://${GATEWAY}/ipfs/${ipfsHash}`

        console.log("File uploaded to IPFS:", url)
        return url;
    } catch(error) {
        console.error("error uploading file to ipfs: ", error)
        throw new Error("Gagal upload ke IPFS");
    }
}