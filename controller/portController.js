import network from "../model/portModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const addData = async (req, res) => {
  try {
    const { containers } = req.body;

    if (!containers || !Array.isArray(containers)) {
      return res.status(400).json({ message: "Containers must be an array" });
    }

    const newNetwork = new network({ containers });
    await newNetwork.save();

    const { containerImage, containerName, containerPort } = containers[0];  // aik controller ka idea karh ke kiya

    const localsFilePath = path.join(__dirname, "../locals.tf");  

    fs.readFile(localsFilePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error reading locals.tf file", error: err });
      }

      let updatedData = data.replace(/ecs-container-image\s*=\s*""/g, `ecs-container-image = "${containerImage}"`);
      updatedData = updatedData.replace(/ecs-container-name\s*=\s*""/g, `ecs-container-name = "${containerName}"`);
      updatedData = updatedData.replace(/ecs-container-port\s*=\s*""/g, `ecs-container-port = "${containerPort}"`);

      fs.writeFile(localsFilePath, updatedData, 'utf8', (err) => {
        if (err) {
          return res.status(500).json({ message: "Error writing to locals.tf", error: err });
        }

        res.status(201).json({ message: "Data added and locals.tf updated successfully", data: newNetwork });
      });
    });

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
