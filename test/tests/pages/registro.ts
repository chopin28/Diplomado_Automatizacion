import { Locator, Page } from "@playwright/test";

const URL = "http://localhost:3000";


export class RegistroPage {
    private readonly nombreInput: Locator;
    private readonly emailInput: Locator;
    private readonly contrasennaInput: Locator;
    private readonly registrarButton: Locator;
    private readonly estadoLabel: Locator;
    constructor(private readonly page: Page) {
        this.nombreInput = page.getByRole('textbox', { name: 'Nombre' });
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.contrasennaInput = page.getByRole('textbox', { name: 'Contraseña' });
        this.registrarButton = page.getByRole('button', { name: 'Registrar' });
        this.estadoLabel = page.locator('#status-box');
    }
    //Abrir la página
    async open(): Promise<RegistroPage>{
        await this.page.goto(URL);
        return this;
    }
    
    
    //Diligenciar formulario
    async fillForm(nombre: string, email: string, contrasenna: string): Promise<void> {
        await this.nombreInput.fill(nombre);
        await this.emailInput.fill(email);
        await this.contrasennaInput.fill(contrasenna);

    }
    async submit(): Promise<void> {
        await this.registrarButton.click();
    }
    async verEstado(): Promise<string | null> {
        return await this.estadoLabel.textContent();
    }
}