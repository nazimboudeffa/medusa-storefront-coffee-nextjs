import Medusa from "@medusajs/medusa-js"

console.log(process.env.BACKEND_URL)

const medusa = new Medusa({ baseUrl: process.env.BACKEND_URL })

export { medusa }