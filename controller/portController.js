import network from "../model/portModel.js";  

export const addData = async (req, res) => {
  try {
    const { containers } = req.body;


    if (!containers || !Array.isArray(containers)) {
      return res.status(400).json({ message: "Containers must be an array" });
    }

    const newNetwork = new network({ containers });
    await newNetwork.save();

    res.status(201).json({ message: "Data added successfully", data: newNetwork });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const viewData = async (req, res) => {
  try {
    const data = await network.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
