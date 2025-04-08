let input = document.getElementById("inputBox");
let image = document.getElementById("imageContainer");
let genBtn = document.getElementById("generateBtn");
let loadpara = document.getElementById("loading");
let downBtn = document.getElementById("download");

async function query(data) {
    const response = await fetch(
        "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
            headers: {
                Authorization: "Bearer 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",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ inputs: input.value }),
        }
    );
    const result = await response.blob();
    return result;
}
async function generate() {
    image.style.display = 'none';
    downBtn.style.display = 'none';
    loadpara.style.display = 'flex';

    query().then((response) => {
        const objectURL = URL.createObjectURL(response);
        image.src = objectURL;
        loadpara.style.display = 'none';
        image.style.display = 'flex';
        downBtn.style.display = 'flex';
        downBtn.addEventListener('click',()=>{
            download(objectURL);
        })
    });
}
genBtn.addEventListener("click", ()=>{
    generate();
})
input.addEventListener('keydown',(e)=>{
    if(e.key == 'Enter'){
        generate();
    }
})

function download(objectURL) {
    fetch(objectURL).then(res=>res.blob())
    .then(file=>{
        let a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = new Date().getTime();
        a.click();
    })
    .catch(()=>alert('Failed Download!'))
    window.location.reload()
}