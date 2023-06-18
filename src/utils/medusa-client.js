import Medusa from "@medusajs/medusa-js"

const medusa = new Medusa({ baseUrl: process.env.BACKEND_URL })

export { medusa }