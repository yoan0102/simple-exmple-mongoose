const express = require("express");
const mongoose = require("mongoose");
const Curso = require("./coursse");
const Video = require("./videos");

mongoose.connect("mongodb://127.0.0.1/mongoose-course", () => {
  console.log(`DB running`);
});

const app = express();

app.get("/", (req, res) => {
  const perPage = 0;
  const page = 1;
  Curso.find({}, null, { sort: { numberOfTopic: -1, title: -1 } })
    .limit(perPage)
    .skip(page * perPage)
    .select({
      slug: false,
      __v: false,
    })
    .populate("videos")
    .then((docs) => {
      return res.json({
        ok: true,
        docs,
      });
    })

    .catch((err) => {
      return res.json(err);
    });
});

app.get("/cursos", (req, res) => {
  Curso.find({})
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

app.get("/cursos/:id", (req, res) => {
  const { id } = req.params;
  Curso.findById(id)
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

app.get("/cursos/:id/videos", (req, res) => {
  const { id } = req.params;
  Curso.findById(id)
    .then((curso) => {
      curso.videos.then((videos) => {
        res.json(videos);
      });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});
app.post("/cursos", (req, res) => {
  Curso.create({
    title: "Curso Ruby",
    description: "Tres asdasdasdas dadq r1 1 fas fd1e 12 e1231231231 23",
  })
    .then((doc) => {
      return res.json({
        curso: doc,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json(err);
    });
});

app.patch("/cursos/:id", (req, res) => {
  /*
   * Course.update({numberOfTopic:0}, {published: new Date(), multi:true}).then(r => {
   *   return res.json(r)
   * )
   * */
  const { id } = req.params;

  Curso.findByIdAndUpdate(
    id,
    {
      title: "Curso Mongose",
      description: "Tres asdasdasdas dadq r1 1 fas fd1e 12 e1231231231 23!!",
    },
    { new: true }
  )
    .then((doc) => {
      return res.json({
        curso: doc,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json(err);
    });
});

app.delete("/cursos/:id", (req, res) => {
  // const {id} = req.params
  // Curso.findByIdAndDelete(id).then(doc => {
  //    res.status(204).json({msg: 'Se borro el recurso correctamente'})
  // }).catch(err =>{
  //     console.log(err)
  //     res.json(err)
  // })
  Curso.deleteMany({ numberOfTopic: 0 })
    .then((r) => {
      return res.json(r);
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.post("/videos", (req, res) => {
//   Video.create({
//     title: "Promer video",
//     course: "63802c03c78a8d097bda4cad",
//   })
//     .then((vid) => {
//       return Curso.findById("63802c03c78a8d097bda4cad").then((curso) => {
//         curso.videos.push(vid.id);
//         return curso.save();
//       });
//     })
//     .then((resp) => {
//       return res.json(resp);
//     })
//     .catch((err) => {
//       console.log(err);
//       return res.json(err);
//     });
// });

app.post("/videos", (req, res) => {
  Video.create({
    title: "Promer video",
    course: "63802c03c78a8d097bda4cad",
    tags: [
      {
        title: "Ruby",
      },
      {
        title: "WEB",
      },
    ],
  })
    .then((vid) => {
      res.json(vid);
    })
    .catch((err) => {
      console.log(err);
      return res.json(err);
    });
});

app.get("/videos", (req, res) => {
  Video.find({})
    .populate("course")
    .then((videos) => res.json(videos))
    .catch((err) => {
      console.log(err);
      return res.json(err);
    });
});

app.put("/videos/:id", (req, res) => {
  let video = Video.findById(req.params.id)
    .then((vid) => {
      vid.tags[0] = { title: "Ruby v3" };
      return vid.save();
    })
    .then((vid) => {
      return res.json(vid);
    })
    .catch((err) => {
      console.log(err);
      return res.json(err);
    });
});

app.delete("/videos/:id/tags/:tag_id", (req, res) => {
  let video = Video.findById(req.params.id)
    .then((vid) => {
      const tag = vid.tags.id(req.params.tag_id).remove();
      vid.save();
      return vid;
    })
    .then((vid) => {
      return res.json(vid);
    })
    .catch((err) => {
      console.log(err);
      return res.json(err);
    });
});

app.listen(8000, () => console.log(`Server running 🚀🚀🚀😱😱😱`));
