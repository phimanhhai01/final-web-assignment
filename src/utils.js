export const addToast = (toast={type: 'success', title:'', message: '', duration: 3000}, close_icon = true) => {
    const parent = document.getElementById('toasts')
    const icon = {
        success: 'bx bx-check-circle',
        info: 'bx bxs-info-circle',
        warning: 'bx bxs-error-alt',
        error: 'bx bxs-error-alt'
    }

    let t = document.createElement('div')
    t.classList.add(`toast`)
    t.classList.add(`toast--${toast.type}`)
    t.style.setProperty('--main-duration', `${Math.round(toast.duration/1000).toFixed(2)}s`)

    t.innerHTML = `
            <div class="toast__icon">
                <i class='${icon[toast.type]}'></i>
            </div>
            <div class="toast__body">
                <div class="toast__title">
                    ${toast.title}
                </div>
                <div class="toast__message">
                    ${toast.message}
                </div>
            </div>
            <div class='toast__line'></div>
    `
    
    if (parent) {
        parent.appendChild(t)
        if (close_icon) {
            let cicon = document.createElement('div')
            cicon.classList.add('toast__close')
            cicon.innerHTML = "<i class='bx bx-x'></i>"
            t.appendChild(cicon)
            cicon.addEventListener('click', () =>{
                parent.removeChild(t)
            })
        }
        t.addEventListener('animationend', (e) => {
            // console.log(e)
            if(e.animationName === 'toast_fadeout') {
                parent.removeChild(t)
            }
        });       
    }
  
}