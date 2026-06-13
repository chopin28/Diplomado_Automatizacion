import { expect, test } from "@playwright/test";
import { RegistroPage } from "./pages/registro";

const ESTADOPENDIENTE = new Set(["Estado: Esperando registro...","Estado: Procesando..."])

test("Registrar Usuario", async ({page})=>{
   //crear constante y abrir la página
    const registroPage = await new RegistroPage(page).open();
    //Llenar los datos
    await registroPage.fillForm("Diana","prueba1@test.com","abc123");
    await registroPage.submit();
    const estado = await waitForStatus(registroPage);
    expect(estado).toBe("Estado: Usuario Creado Exitosamente")

})

async function waitForStatus(registroPage, timeoutMs = 10000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    const estado = await registroPage.verEstado();
    console.log(estado);

    if (!ESTADOPENDIENTE.has(estado)){
      return estado;
    }
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  throw new Error(`Timeout esperando estado del registro`);
}