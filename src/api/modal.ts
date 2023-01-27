export type ModalButton = {
    text: string;
    type: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
    onClick: () => void;
};


export function createModal(title: string, content: string, buttons: Array<ModalButton>, closeOnOutsideClick: boolean = true): void {
    // create modal
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.style.display = "block";
    modal.style.position = "fixed";
    modal.style.zIndex = "9999";
    modal.style.left = "0";
    modal.style.top = "0";
    modal.style.width = "25%";
    modal.style.height = "25%";
    modal.style.overflow = "auto";
    // glass effect
    modal.style.backgroundColor = "rgba(22, 24, 25, 0.8)";
    // flex container
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    // modal content
    modal.style.backdropFilter = "blur(10px)";
    modal.style.borderRadius = "0.25rem";
    modal.style.color = "#fff";
    

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

const testModal = createModal("Test Modal", "This is a test modal", [
    {
        text: "Close",
        type: "secondary",
        onClick: () => {
            console.log("Closed modal");
        }
    },
    {
        text: "Test",
        type: "primary",
        onClick: () => {
            console.log("Tested modal");
        }
    }
]);
