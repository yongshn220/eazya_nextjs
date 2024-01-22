
// TODO: Handle Multiple University
export const UniversityIds = [
  "stonybrook",
  "gmail",
]


export const DEFAULT_PAGE_LENGTH = {
  EVENT: 8,
  COMMUNITY: 8,
  STORE: 8,
  NOTIFICATION: 10,
  USER_ACTIVITY: 10,
}


// TODO: Handle Multiple Universities' Major
export const MajorList = ["AAS","ACC","ADV","AFH","AFS","AIM","AMR","AMS","ANP","ANT","ARB","ARH","ARS","ASC","AST","ATM","BCP","BIO","BME","BUS","CAR","CCS","CDS","CEF","CHE","CHI","CIV","CLL","CLS","CLT","CME","COM","CSE","CWL","DAN","DIA","EAS","EBH","ECO","EDP","EEL","EEO","EGL","ENS","ENV","ESE","ESG","ESM","EST","EUR","EXT","FLA","FLM","FRN","GEO","GER","GLI","GRK","GSS","HAD","HAL","HAN","HAT","HBA","HBH","HBM","HBP","HBW","HBY","HDG","HDO","HDP","HIN","HIS","HNI","HON","HUE","HUF","HUG","HUI","HUL","HUR","HUS","HWC","IAE","IAP","INT","ISE","ITL","JDH","JDS","JPN","JRN","KOR","KSW","LAC","LAN","LAT","LCR","LDR","LHD","LHW","LIA","LIN","MAE","MAP","MAR","MAT","MDA","MEC","MSL","MUS","MVL","OAE","PER","PHI","PHY","POL","POR","PSY","RLS","RUS","SBU","SCH","SCI","SKT","SLN","SOC","SPN","SSE","SUS","THR","TRK","TVW","UKR","VIP","WAE","WRT","WSE","WST"]

export const MajorType = {
  NONE: "None",
  UNDECLARED: "Undeclared",
  ...Object.fromEntries(MajorList.map(major => [major, major]))
}
