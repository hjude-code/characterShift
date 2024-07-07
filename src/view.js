let offsetText = document.querySelectorAll('h1.wp-block-hjude-character-shift')


const threshold = (incriment) =>{
    let steps = []
    let step = 0

    while(step < 1){
        steps.push(step)
        step += incriment
    }

    return steps
} 


let offsetTextObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{
        if(entry.isIntersecting){
            let textOffset = -1

            let fromTop = entry.boundingClientRect.top
            let fromBottom = window.innerHeight - entry.boundingClientRect.bottom

            if(fromTop > fromBottom){ //bottom intersection
                textOffset = -2+entry.intersectionRatio
            }else if(fromBottom >= fromTop){ //top intersection
                textOffset = -1+(1-entry.intersectionRatio)
               
            }


            entry.target.style.setProperty('--intersection', textOffset)
        }
    
    })
    
}, {
    threshold: threshold(0.001),
    rootMargin: '0px'
})

offsetText.forEach(element=>{
    offsetTextObserver.observe(element)
})
