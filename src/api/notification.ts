export enum LogLevel {
    INFO = "info",
    WARNING = "warning",
    ERROR = "error",
    SUCCESS = "success",
    DEBUG = "debug"
}


export const showNotification = (title, message, persistent = false, logLevel: LogLevel = LogLevel.INFO): HTMLDivElement => {
    // get body
    const body = document.querySelector("body");
    // create notification
    const notification = document.createElement("div");
    notification.className = "fmplus notification";

    const notificationStyle: Partial<CSSStyleDeclaration> = {
        position: "fixed",
        right: "0",
        width: "fit-content",
        maxWidth: "50%",
        minWidth: "25rem",
        margin: "0.5rem",
        padding: "0.5rem",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderRadius: "0.25rem",
        color: "#fff",
        textAlign: "center",
        zIndex: "9999"
    }

    const existingNotifications = document.querySelectorAll(".fmplus.notification");
    if (existingNotifications.length > 0) {
        // get last notification
        const lastNotification = existingNotifications[existingNotifications.length - 1];
        // get last notification's position
        const lastNotificationPosition = lastNotification.getBoundingClientRect();
        // set notification's position to be below the last notification
        notificationStyle.top = `${lastNotificationPosition.top + lastNotificationPosition.height + 10}px`;
    } else {
        // no notifications exist, so set notification's position to be at the top
        notificationStyle.top = "0";
    }

    

    Object.assign(notification.style, notificationStyle);

    // create title
    const notificationTitle = document.createElement("h3");
    notificationTitle.className = "fmplus notification-title";
    notificationTitle.innerHTML = title;

    const notificationTitleStyle: Partial<CSSStyleDeclaration> = {
        top: "0",
        left: "0",
        margin: "0",
        padding: "0",
        fontSize: "1.5rem",
        fontWeight: "bold"
    }

    Object.assign(notificationTitle.style, notificationTitleStyle);

    // create message
    const notificationMessage = document.createElement("p");
    notificationMessage.className = "fmplus notification-message";

    const notificationMessageStyle: Partial<CSSStyleDeclaration> = {
        textAlign: "left",
        margin: "0",
        padding: "0"
    }

    Object.assign(notificationMessage.style, notificationMessageStyle);

    notificationMessage.innerHTML = message;
    // append title and message to notification
    notification.appendChild(notificationTitle);
    notification.appendChild(notificationMessage);

    // animate notification
    notification.animate([
        { transform: "translateY(-100%)" },
        { transform: "translateY(0)" }
    ], {
        duration: 500,
        easing: "ease-in-out"
    });

    // append notification to body
    body.appendChild(notification);
    // remove notification after 5 seconds
    persistent ? null :
    setTimeout(() => {
        notification.animate([
            { transform: "translateY(0)" },
            { transform: "translateY(-100%)" }
        ], {
            duration: 500,
            easing: "ease-in-out"
        }).onfinish = () => {
            notification.remove();
        }
    }, 5000);

    notification.addEventListener("click", () => {
        // animate out and adjust position of other notifications
        notification.animate([
            { transform: "translateY(0)" },
            { transform: "translateY(-100%)" }
        ], {
            duration: 500,
            easing: "ease-in-out"
        }).onfinish = () => {
            notification.remove();
        }
        // get all notifications
        const notifications = document.querySelectorAll(".fmplus.notification");
        // get index of notification
        const index = Array.from(notifications).indexOf(notification);
        // get all notifications after the clicked notification
        const notificationsAfter = Array.from(notifications).slice(index + 1);
        // animate all notifications after the clicked notification
        notificationsAfter.forEach((notification) => {
            const notificationPosition = notification.getBoundingClientRect();
            notification.animate([
                { transform: `translateY(${notificationPosition.top}px)` },
                { transform: `translateY(${notificationPosition.top - 65}px)` }
            ], {
                duration: 500,
                easing: "ease-in-out"
            });
            notificationStyle.top = `${notificationPosition.top - 65}px`;
        });
    });

    return notification;
}

export const showToast = (message): HTMLDivElement => {
    // same as showNotification, but without a title and bottom aligned full width
    const body = document.querySelector("body");
    const notification = document.createElement("div");
    notification.className = "fmplus toast";

    const existingToasts = document.querySelectorAll(".fmplus.toast");
    if (existingToasts.length > 0) {
        // get last toast
        const lastToast = existingToasts[existingToasts.length - 1];
        // get last toast's position
        const lastToastPosition = lastToast.getBoundingClientRect();
        // set toast's position to be below the last toast
        notification.style.bottom = `${lastToastPosition.top + 10}px`;
        notification.style.top = "unset";
    } else {
        // no toasts exist, so set toast's position to be at the bottom
        notification.style.bottom = "0";
    }

    notification.style.position = "fixed";
    notification.style.left = "0";
    notification.style.width = "100%";
    notification.style.margin = "1.5rem";
    notification.style.padding = "1.5rem";
    notification.style.backgroundColor = "rgba(22, 24, 25, 0.8)";
    notification.style.backdropFilter = "blur(10px)";
    notification.style.borderRadius = "0.25rem";
    notification.style.color = "#fff";
    notification.style.textAlign = "center";
    notification.style.zIndex = "9999"; 
    const notificationMessage = document.createElement("p");
    notificationMessage.className = "fmplus notification-message";
    notificationMessage.style.textAlign = "center";
    notificationMessage.style.margin = "0";
    notificationMessage.style.padding = "0";
    notificationMessage.style.fontSize = "1.5rem";
    notificationMessage.style.fontWeight = "bold";

    notificationMessage.innerHTML = message;

    // animate toast in and out
    notification.animate([
        { opacity: 0, transform: "translateY(100%)" },
        { opacity: 1, transform: "translateY(0)" }
    ], {
        duration: 500,
        easing: "ease-in-out"
    });


    notification.appendChild(notificationMessage);
    body.appendChild(notification);
    // remove toast after 5 seconds and animate out
    setTimeout(() => {
        notification.animate([
            { opacity: 1, transform: "translateY(0)" },
            { opacity: 0, transform: "translateY(100%)" }
        ], {
            duration: 500,
            easing: "ease-in-out"
        }).onfinish = () => {
            notification.remove();
        }
    }, 5000);

    notification.addEventListener("click", () => {
        notification.animate([
            { opacity: 1, transform: "translateY(0)" },
            { opacity: 0, transform: "translateY(100%)" }
        ], {
            duration: 500,
            easing: "ease-in-out"
        }).onfinish = () => {
            notification.remove();
        }
        // get all toasts
        const toasts = document.querySelectorAll(".fmplus.toast") as NodeListOf<HTMLDivElement>;
        // get index of toast
        const index = Array.from(toasts).indexOf(notification);
        // get all toasts after the clicked toast
        const toastsAfter = Array.from(toasts).slice(index + 1);
        // animate all toasts after the clicked toast
        toastsAfter.forEach((toast) => {
            const toastPosition = toast.getBoundingClientRect();
            toast.animate([
                { transform: `translateY(${toastPosition.top}px)` },
                { transform: `translateY(${toastPosition.top + 65}px)` }
            ], {
                duration: 500,
                easing: "ease-in-out"
            });
            toast.style.top = `${toastPosition.top + 65}px`;
        });
    });

    return notification;
}