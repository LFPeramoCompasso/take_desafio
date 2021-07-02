const express = require("express");
const app = express();
const axios = require("axios");
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    let artigo = {};
    let array = [];

    const { data } = await axios(
      "https://api.github.com/users/takenet/repos?&type=public&sort=created&direction=asc&per_page=50"
    );
    let filtro = data.filter((item) => {
      return item.language == "C#";
    });
    
    for (var i = 0; i < 5; i++) {
        artigo = {
            language: filtro[i].language,
            description: filtro[i].description,
            full_name: filtro[i].full_name,
            avatar_url: filtro[i].owner.avatar_url           
        }
        array.push(artigo)
    }
    return res.status(200).json(array);
  } catch (error) {
    res.status(400).json({ error: 'erro ao tentar consumir api' });
  }
});

app.listen(port, () => {
  console.log("Fake server started on port " + port);
});

