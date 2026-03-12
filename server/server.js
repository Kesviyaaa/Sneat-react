const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* MongoDB Connection */
mongoose
  .connect(
    "mongodb+srv://anniekesviyaa_db:anniekesviya10A@react-form-cluster.bkeubt5.mongodb.net/menudb?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.error(err));

/* ============================= */
/* SCHEMAS */
/* ============================= */

const MenuSchema = new mongoose.Schema({
  parentMenuName: String,
  moduleName: String,
  menuDescription: String,
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const SubMenuSchema = new mongoose.Schema({
  menuName: {
    type: String,
    required: true,
  },
  pageName: String,
  menuListNo: {
    type: Number,
    required: true,
  },
  moduleName: {
    type: String,
    required: true,
  },
  parentMenuName: String,
  folderName: String,

  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const ModuleSchema = new mongoose.Schema({
  moduleName: {
    type: String,
    required: true,
  },

  description: String,

  status: {
    type: Boolean,
    default: false,
  },

  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const RegionSchema = new mongoose.Schema({
  portRegion: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  portName: {
    type: String,
    required: true,
  },

  addAllPorts: {
    type: Boolean,
    default: false,
  },

  status: {
    type: Boolean,
    default: false,
  },

  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const CountrySchema = new mongoose.Schema({
  countryName: {
    type: String,
    required: true,
  },

  countryCode: {
    type: String,
    required: true,
  },

  region: {
    type: String,
    required: true,
  },

  timeZone: String,

  isdCode: {
    type: String,
    required: true,
  },

  currency: {
    type: String,
    required: true,
  },

  language: String,

  status: {
    type: Boolean,
    default: false,
  },

  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const PortSchema = new mongoose.Schema({
  portName: {
    type: String,
    required: true,
  },

  portCode: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  state: String,

  timeZone: {
    type: String,
    required: true,
  },

  tradeLane: String,

  iata: String,

  unece: {
    type: String,
    required: true,
  },

  coordinates: String,

  schedK: String,

  schedDAirport: String,

  schedDSeaport: String,

  portFunction: [String],

  status: {
    type: Boolean,
    default: false,
  },

  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const CurrencySchema = new mongoose.Schema({
  currencyName: {
    type: String,
    required: true,
  },

  currencyCode: {
    type: String,
    required: true,
  },

  majorUnit: String,

  minorUnit: String,

  scale: Number,

  symbol: String,

  roundTo: Number,

  minimum: Number,

  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const CommoditySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: String,

  iataCode: {
    type: String,
    required: true,
  },

  nature: {
    type: String,
    required: true,
  },

  status: {
    type: Boolean,
    default: true,
  },

  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const UnitSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },

  uneceCode: {
    type: String,
  },

  code: {
    type: String,
    required: true,
  },

  type: {
    type: String,
  },

  plural: {
    type: String,
  },

  decimals: {
    type: Number,
  },

  conversionFactor: {
    type: Number,
  },

  status: {
    type: Boolean,
    default: true,
  },

  createdOn: {
    type: Date,
    default: Date.now,
  },
});
/* ============================= */
/* MODELS */
/* ============================= */

const Menu = mongoose.model("Menu", MenuSchema);
const SubMenu = mongoose.model("SubMenu", SubMenuSchema, "submenus");
const Module = mongoose.model("Module", ModuleSchema, "modules");
const Region = mongoose.model("Region", RegionSchema, "regions");
const Country = mongoose.model("Country", CountrySchema, "countries");
const Port = mongoose.model("Port", PortSchema, "ports");
const Currency = mongoose.model("Currency", CurrencySchema, "currencies");
const Commodity = mongoose.model("Commodity", CommoditySchema, "commodities");
const Unit = mongoose.model("Unit", UnitSchema, "units");
/* ============================= */
/* MENU ROUTES */
/* ============================= */

/* GET ALL MENUS */
app.get("/menus", async (req, res) => {
  try {
    const menus = await Menu.find();

    res.json({
      data: menus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ADD MENU */
app.post("/menus", async (req, res) => {
  try {
    const newMenu = new Menu({
      parentMenuName: req.body.parentMenuName,
      moduleName: req.body.moduleName,
      menuDescription: req.body.menuDescription,
    });

    const savedMenu = await newMenu.save();

    res.json({
      success: true,
      data: savedMenu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* UPDATE MENU */
app.put("/menus/:id", async (req, res) => {
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({
      success: true,
      data: updatedMenu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* DELETE MENU */
app.delete("/menus/:id", async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ============================= */
/* SUBMENU ROUTES */
/* ============================= */

/* GET ALL SUBMENUS */
app.get("/submenus", async (req, res) => {
  try {
    const submenus = await SubMenu.find();

    res.json({
      data: submenus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ADD SUBMENU */
app.post("/submenus", async (req, res) => {
  try {
    const newSubMenu = new SubMenu({
      menuName: req.body.menuName,
      pageName: req.body.pageName,
      menuListNo: req.body.menuListNo,
      moduleName: req.body.moduleName,
      parentMenuName: req.body.parentMenuName,
      folderName: req.body.folderName,
    });

    const savedSubMenu = await newSubMenu.save();

    res.json({
      success: true,
      data: savedSubMenu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* UPDATE SUBMENU */
app.put("/submenus/:id", async (req, res) => {
  try {
    const updatedSubMenu = await SubMenu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: updatedSubMenu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* DELETE SUBMENU */
app.delete("/submenus/:id", async (req, res) => {
  try {
    await SubMenu.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/modules", async (req, res) => {
  try {
    const modules = await Module.find();

    res.json({
      data: modules,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.post("/modules", async (req, res) => {
  try {
    const newModule = new Module({
      moduleName: req.body.moduleName,
      description: req.body.description,
      status: req.body.status,
    });

    const savedModule = await newModule.save();

    res.json({
      success: true,
      data: savedModule,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.put("/modules/:id", async (req, res) => {
  try {
    const updatedModule = await Module.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: updatedModule,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.delete("/modules/:id", async (req, res) => {
  try {
    await Module.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/regions", async (req, res) => {
  try {
    const regions = await Region.find();

    res.json({
      data: regions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.post("/regions", async (req, res) => {
  try {
    const newRegion = new Region({
      portRegion: req.body.portRegion,
      country: req.body.country,
      portName: req.body.portName,
      addAllPorts: req.body.addAllPorts,
      status: req.body.status,
    });

    const savedRegion = await newRegion.save();

    res.json({
      success: true,
      data: savedRegion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.put("/regions/:id", async (req, res) => {
  try {
    const updatedRegion = await Region.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: updatedRegion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.delete("/regions/:id", async (req, res) => {
  try {
    await Region.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ============================= */
/* COUNTRY ROUTES */
/* ============================= */

/* GET ALL COUNTRIES */
app.get("/countries", async (req, res) => {
  try {
    const countries = await Country.find();

    res.json({
      data: countries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ADD COUNTRY */
app.post("/countries", async (req, res) => {
  try {
    const newCountry = new Country({
      countryName: req.body.countryName,
      countryCode: req.body.countryCode,
      region: req.body.region,
      timeZone: req.body.timeZone,
      isdCode: req.body.isdCode,
      currency: req.body.currency,
      language: req.body.language,
      status: req.body.status,
    });

    const savedCountry = await newCountry.save();

    res.json({
      success: true,
      data: savedCountry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* UPDATE COUNTRY */
app.put("/countries/:id", async (req, res) => {
  try {
    const updatedCountry = await Country.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: updatedCountry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* DELETE COUNTRY */
app.delete("/countries/:id", async (req, res) => {
  try {
    await Country.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/ports", async (req, res) => {
  try {
    const ports = await Port.find();

    res.json({
      data: ports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.post("/ports", async (req, res) => {
  try {
    const newPort = new Port(req.body);

    const savedPort = await newPort.save();

    res.json({
      success: true,
      data: savedPort,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.put("/ports/:id", async (req, res) => {
  try {
    const updatedPort = await Port.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({
      success: true,
      data: updatedPort,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.delete("/ports/:id", async (req, res) => {
  try {
    await Port.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ============================= */
/* CURRENCY ROUTES */
/* ============================= */

/* GET ALL CURRENCIES */
app.get("/currencies", async (req, res) => {
  try {
    const currencies = await Currency.find();

    res.json({
      data: currencies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ADD CURRENCY */
app.post("/currencies", async (req, res) => {
  try {
    const newCurrency = new Currency({
      currencyName: req.body.currencyName,
      currencyCode: req.body.currencyCode,
      majorUnit: req.body.majorUnit,
      minorUnit: req.body.minorUnit,
      scale: req.body.scale,
      symbol: req.body.symbol,
      roundTo: req.body.roundTo,
      minimum: req.body.minimum,
    });

    const savedCurrency = await newCurrency.save();

    res.json({
      success: true,
      data: savedCurrency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* UPDATE CURRENCY */
app.put("/currencies/:id", async (req, res) => {
  try {
    const updatedCurrency = await Currency.findByIdAndUpdate(
      req.params.id,
      {
        currencyName: req.body.currencyName,
        currencyCode: req.body.currencyCode,
        majorUnit: req.body.majorUnit,
        minorUnit: req.body.minorUnit,
        scale: req.body.scale,
        symbol: req.body.symbol,
        roundTo: req.body.roundTo,
        minimum: req.body.minimum,
      },
      { new: true }
    );

    res.json({
      success: true,
      data: updatedCurrency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* DELETE CURRENCY */
app.delete("/currencies/:id", async (req, res) => {
  try {
    await Currency.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ============================= */
/* COMMODITY ROUTES */
/* ============================= */

/* GET ALL COMMODITIES */
app.get("/commodities", async (req, res) => {
  try {
    const commodities = await Commodity.find();

    res.json({
      data: commodities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ADD COMMODITY */
app.post("/commodities", async (req, res) => {
  try {
    const newCommodity = new Commodity({
      name: req.body.name,
      description: req.body.description,
      iataCode: req.body.iataCode,
      nature: req.body.nature,
      status: req.body.status,
    });

    const savedCommodity = await newCommodity.save();

    res.json({
      success: true,
      data: savedCommodity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* UPDATE COMMODITY */
app.put("/commodities/:id", async (req, res) => {
  try {
    const updatedCommodity = await Commodity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: updatedCommodity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* DELETE COMMODITY */
app.delete("/commodities/:id", async (req, res) => {
  try {
    await Commodity.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ============================= */
/* UNITS OF MEASUREMENT ROUTES */
/* ============================= */

/* GET ALL UNITS */
app.get("/units", async (req, res) => {
  try {
    const units = await Unit.find().sort({ createdOn: -1 });

    res.json({
      success: true,
      data: units,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ADD UNIT */
app.post("/units", async (req, res) => {
  try {
    const newUnit = new Unit({
      description: req.body.description,
      uneceCode: req.body.uneceCode,
      code: req.body.code,
      type: req.body.type,
      plural: req.body.plural,
      decimals: req.body.decimals,
      conversionFactor: req.body.conversionFactor,
      status: req.body.status,
    });

    const savedUnit = await newUnit.save();

    res.json({
      success: true,
      data: savedUnit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* UPDATE UNIT */
app.put("/units/:id", async (req, res) => {
  try {
    const updatedUnit = await Unit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: updatedUnit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* DELETE UNIT */
app.delete("/units/:id", async (req, res) => {
  try {
    await Unit.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ============================= */
/* START SERVER */
/* ============================= */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
