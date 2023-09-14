import {server} from "./server.js"
const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")
form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")
  const videoURL = input.value
  if(!videoURL.includes("shorts")){
    return (content.textContent = "Esse video nao parece ser um short...")
  }

  const [_, params] = videoURL.split("/shorts/")
  const [videoID] = params.split("?si")
  console.log (videoID)
  content.textContent = "Obtendo o texto do audio..."
  const transcription = await server.get("/summary/" + videoID)
  content.textContent = "Realizando Resumo..."
  /*const summary = await server.post("/summary", {
    text: transcription.data.result,
  })*/
  content.textContent = transcription.data.result
  content.classList.remove("placeholder")
})