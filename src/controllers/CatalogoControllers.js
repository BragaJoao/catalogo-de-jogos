const Jogo = require("../models/Catalogo");
let message = "";
let type = "";

const getAll = async (req, res) => {
  //async, aguarda porque eu vou lá fazer a consulta espere as ações para renderizar a página
  try {
    //tente por esse caminho se der certo
    const catalogo = await Jogo.findAll(); //aguardando
    setTimeout(() => {
        message = "";
      }, 1000);

    res.render("index", {
      catalogo,
      catalogoPut: null,
      catalogoDel: null,
      message,
    });
  } catch (err) {
    //deu erro, venha nesse caminho
    res.status(500).send({ err: err.message }); //vem do objeto erro
  }
};

const signup = (req, res) => {
  try {
    res.render("signup", { message });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const create = async (req, res) => {
  try {
    const games = req.body;
    console.log(games);
    if (!games.nome || !games.descricao || !games.imagem) {
      message = "Preencha todos os campos para cadastrar!";
      type = "danger";
      return res.redirect("/signup");
    }

    await Jogo.create(games);
    message = "Jogo adicionado com sucesso!";
    type = "success";
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

// Pegando o ID para gerar a página de informações
const getById = async (req, res) => {
  try {
    const games = await Jogo.findByPk(req.params.id); //encontrando o jogo que foi escolhido pelo id, findByPk procurar pela chave primaria que é o id, e esse id vai chegar por parametro.
    res.render("details", {
      games,
      message
    });
  } catch (err) {
    //deu erro, venha nesse caminho
    res.status(500).send({ err: err.message }); //vem do objeto erro
  }
};


//Rota de validação para editar o jogo
const editar1 = async (req, res) => {
    const games = await Jogo.findByPk(req.params.id);
  
    if (!games) {
      res.render("edit", {
        message: "Jogo não foi encontrado!",
        type: "danger",
      });
    }
    res.render("edit", {
      games,
      message: "Jogo editado com sucesso",
      type:"success",
    });
  };

  //rota de edição do jogo
const editar = async (req, res) => {
    try {
      const games = await Jogo.findByPk(req.params.id);
      const { nome, descricao, imagem } = req.body;
  
      games.nome = nome;
      games.descricao = descricao;
      games.imagem = imagem;
  
      const jogoEditado = await games.save();

      
      res.redirect("/");
    } catch (err) {
     
      res.status(500).send({ err: err.message }); 
    }
  };

 
const deletar = async (req,res) => {
    try{
      const games = await Jogo.findByPk(req.params.id);
  
      if(!games){
        res.render("delete", {
          message: "Jogo não foi encontrado!",
          type: "danger",
        });
      }
      res.render("delete", {
        games, message:"Jogo deletado com sucesso.",
      });
    }catch (err) {
      res.status(500).send({ err: err.message });
  }
  };
  
  const deletar1 = async (req,res) => {
    const games = await Jogo.findByPk(req.params.id);
  
    if(!games){
      res.render("delete", {
        message: "Jogo não encontrado",
      });
    }
  
    await games.destroy();
    res.redirect("/");
  };

module.exports = {
  getAll,
  signup,
  getById,
  create,
  editar1,
  editar,
  deletar,
  deletar1
};
