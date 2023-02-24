const LINK = "https://api.frankfurter.app";

async function traerMonedas() {
try {
  (await fetch(`${LINK}/currencies`)).json()
} catch(error) {
  console.log(error)
} 

}
