"use strict";var require$$0$1=require("dotenv"),express=require("express"),bodyParser=require("body-parser"),axios=require("axios"),require$$0=require("node-localstorage"),compression=require("compression");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var require$$0__default$1=_interopDefaultLegacy(require$$0$1),express__default=_interopDefaultLegacy(express),bodyParser__default=_interopDefaultLegacy(bodyParser),axios__default=_interopDefaultLegacy(axios),require$$0__default=_interopDefaultLegacy(require$$0),compression__default=_interopDefaultLegacy(compression);const fetchData=async e=>{return(await axios__default.default(`${process.env.BASEURL}/${e}`,{method:"GET",headers:{"x-rapidapi-key":`${process.env.KEY}`,"x-rapidapi-host":`${process.env.HOST}`}})).data};var api={fetchData:fetchData};const filterArray=e=>{return e.reduce((e,r)=>{return e.find(e=>e.id===r.id)?e:e.concat([r])},[])},formatData=e=>e.map(e=>({id:e.artist.id,name:e.artist.name,picture_medium:e.artist.picture_medium,type:e.type}));var utils={filterArray:filterArray,formatData:formatData};const router$3=express__default.default.Router();let useStorage$1="";const data=[];let json$1;if("undefined"==typeof localStorage||null===localStorage){const l=require$$0__default.default.LocalStorage;useStorage$1=new l("./scratch")}router$3.get("/",async(e,r)=>{if(useStorage$1.getItem("index"))return r.render("index.ejs",{data:JSON.parse(useStorage$1.getItem("index")),rerender:!1});for(let e=0;e<7;e++)json$1=await api.fetchData(`artist/${e}`),"object"==typeof json$1?data.push(json$1):data=await json$1.map(e=>e);return json$1.error?r.render("index.ejs",{data:JSON.parse(useStorage$1.getItem("index")),rerender:!1}):json$1?(useStorage$1.setItem("index",JSON.stringify(data)),r.render("index.ejs",{data:data,rerender:!1})):void 0}),router$3.post("/app",async(e,r)=>{e=e.body.value;if(useStorage$1.getItem(e))return r.render("index.ejs",{data:JSON.parse(useStorage$1.getItem(e))});if(json$1=await api.fetchData(`search?q=${e}`),json$1.error)return r.render("index.ejs",{data:JSON.parse(useStorage$1.getItem("index")),rerender:!1});json$1.data.map(e=>e);e=utils.formatData(json$1.data),e=utils.filterArray(e);return json$1&&!json$1.error?(useStorage$1.setItem("index",JSON.stringify(e)),r.render("index.ejs",{data:e,rerender:!1})):void 0});var src=router$3;const router$2=express__default.default.Router();let useStorage="",json;if("undefined"==typeof localStorage||null===localStorage){const w=require$$0__default.default.LocalStorage;useStorage=new w("./scratch")}router$2.get("/artist/:name",async(e,r)=>{e=e.params.name;return useStorage.getItem(e)?r.render("carousel.ejs",{data:JSON.parse(useStorage.getItem(e))}):(json=await api.fetchData(`search?q=${e}`),json.error?(console.log("error"),r.redirect("/")):(dataset=json.data.map(e=>e),json?(useStorage.setItem(e,JSON.stringify(dataset)),r.render("carousel.ejs",{data:dataset})):void 0))});var carousel=router$2;const router$1=express__default.default.Router();router$1.get("/offline",(e,r)=>r.render("offline.ejs"));var offline=router$1;const router=express__default.default.Router();router.use(bodyParser__default.default.urlencoded({extended:!0})),router.use("/",src),router.use("/",carousel),router.use("/",offline);var router_1=router;require$$0__default$1.default.config();const app=express__default.default(),port=process.env.PORT||3e3;app.use(router_1),app.use(bodyParser__default.default.urlencoded({extended:!0})),app.use(express__default.default.static(`${__dirname}/public`)),app.use(compression__default.default({threshold:1})),app.set("view engine","ejs"),app.set("views","view"),app.listen(port,()=>{console.log(`App listening at http://localhost:${port}`)});var progressiveWebApps2021={};module.exports=progressiveWebApps2021;
