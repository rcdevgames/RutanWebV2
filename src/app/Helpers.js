import { loadCityListData } from "../modules/MasterData/Store/MasterDataActions";
import history from "./History";

export const navigate = (path) => {
  history.push(path);
  window.location.reload();
};

export const SelectLocation = [
  {
    id: `location-1`,
    value: "L1",
    label: "Cabang",
  },
  {
    id: `location-2`,
    value: "L2",
    label: "Depo PT Rutan",
  },
];

export const SelectType = [
  {
    id: `type-1`,
    value: "T1",
    label: "Project",
  },
  {
    id: `type-2`,
    value: "T2",
    label: "PB",
  },
  {
    id: `type-3`,
    value: "T3",
    label: "Komersil",
  },
];

export const SelectInstanceType = [
  {
    id: `type-1`,
    value: "T1",
    label: "Penggilingan",
  },
  {
    id: `type-2`,
    value: "T2",
    label: "Kelompok Tani",
  },
];

export const SelectStatus = [
  {
    id: `status-1`,
    value: "S1",
    label: "Progress",
  },
  {
    id: `status-2`,
    value: "S2",
    label: "Finished",
  },
  {
    id: `status-3`,
    value: "S3",
    label: "Rejected",
  },
];

export const SelectStatusMilling = [
  {
    id: `status-1`,
    value: "S1",
    label: "Pemilik",
  },
  {
    id: `status-2`,
    value: "S2",
    label: "Operator",
  },
  {
    id: `status-3`,
    value: "S3",
    label: "Penanggung Jawab",
  },
  {
    id: `status-3`,
    value: "S4",
    label: "Lain-lain",
  },
];

export const SelectStatusIdentification = [
  {
    id: `status-identification-1`,
    value: "S1",
    label: "Pemilik",
  },
  {
    id: `status-identification-2`,
    value: "S2",
    label: "Operator",
  },
  {
    id: `status-identification-3`,
    value: "S3",
    label: "Penanggung Jawab",
  },
];

export const SelectMilling = [
  {
    id: `milling-1`,
    value: "true",
    label: "Penggilingan",
  },
  {
    id: `milling-2`,
    value: "false",
    label: "non-Penggilingan",
  },
];

export const enumTypeInternalServices = [
  { id: `enum-type-1`, value: "T1", label: "Repair" },
  { id: `enum-type-2`, value: "T2", label: "TroubleShoot" },
  { id: `enum-type-3`, value: "T3", label: "Training" },
];

export const enumTypeExternalServices = [
  { id: `enum-type-1`, value: "T1", label: "Repair" },
  { id: `enum-type-2`, value: "T2", label: "TroubleShoot" },
  { id: `enum-type-3`, value: "T3", label: "Identification" },
  { id: `enum-type-4`, value: "T4", label: "Training" },
  { id: `enum-type-5`, value: "T5", label: "Demo" },
  { id: `enum-type-6`, value: "T6", label: "Modification" },
];

export const enumWarranty = [
  { id: `enum-warranty-1`, value: true, label: "Warranty" },
  { id: `enum-warranty-2`, value: false, label: "No Warranty" },
];

export const getProvinceEnum = (data) => {
  const SelectProvince = [];
  data.map((item, index) => {
    SelectProvince.push({
      id: `province-${index}`,
      value: item.id,
      label: item.name,
    });
  });
  return SelectProvince;
};

export const getCitiesEnum = (data) => {
  const SelectCities = [];
  data.map((item, index) => {
    SelectCities.push({
      id: `city-${index}`,
      value: item.id,
      label: item.name,
    });
  });
  return SelectCities;
};

export const getMachineConf = (data) => {
  const SelectMachines = [];
  data.map((item, index) => {
    SelectMachines.push({
      id: item.id,
      name: item.name.replace(/ /g, '_').toLowerCase(),
      type: item.name,
    });
  });
  return SelectMachines;
};

// This list not used
export const machineConf = [
  {
    name: "dryer",
    type: "dryer",
  },
  {
    name: "cleaner",
    type: "cleaner",
  },
  {
    name: "head_husker",
    type: "head husker",
  },
  {
    name: "body_husker",
    type: "body husker",
  },
  {
    name: "separator",
    type: "separator",
  },
  {
    name: "destoner",
    type: "destoner",
  },
  {
    name: "horizontal_abrasive",
    type: "horizontal abrasive",
  },

  {
    name: "vertikal_abrasive",
    type: "vertikal abrasive",
  },
  {
    name: "horizontal_abrasive",
    type: "horizontal abrasive",
  },
  {
    name: "friction_abrasive",
    type: "friction abrasive",
  },
  {
    name: "rotary_rice_sifter",
    type: "rotary rice sifter",
  },
  {
    name: "non_rotary_rice_sifter",
    type: "non rotary rice sifter",
  },

  {
    name: "length_grader",
    type: "length grader",
  },
  {
    name: "milling_meter",
    type: "milling meter",
  },
  {
    name: "scale",
    type: "scale",
  },
];