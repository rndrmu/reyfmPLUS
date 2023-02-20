export type ModalButton = {
    text: string;
    type: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
    onClick: () => void;
};


export function createModal(title: string, content: string, buttons: Array<ModalButton>, closeOnOutsideClick: boolean = true): void {
    // create modal
    const modal = document.createElement("div");
    modal.className = "modal";

    const modalStyle: Partial<CSSStyleDeclaration> = {
        display: "block flex",
        position: "fixed",
        zIndex: "9999",
        left: "0",
        top: "0",
        width: "25%",
        height: "25%",
        overflow: "auto",
        backgroundColor: "rgba(22, 24, 25, 0.8)",
        backdropFilter: "blur(10px)",
        borderRadius: "0.25rem",
        color: "#fff",
        justifyContent: "center",
        alignItems: "center"
    }

    Object.assign(modal.style, modalStyle);
    

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                ${content}
            </div>
            <div class="modal-footer">
                ${buttons.map((button) => `<button class="btn btn-${button.type}">${button.text}</button>`).join("")}
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // add event listeners
    modal.querySelector(".close").addEventListener("click", () => {
        modal.remove();
    });
    if (closeOnOutsideClick) {
        modal.addEventListener("click", () => {
            modal.remove();
        });
    }
    modal.querySelector(".modal-content").addEventListener("click", (event) => {
        event.stopPropagation();
    });
    buttons.forEach((button, index) => {
        modal.querySelectorAll(".modal-footer button")[index].addEventListener("click", () => {
            button.onClick();
            modal.remove();
        });
    });
}

