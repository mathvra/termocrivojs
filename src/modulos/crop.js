import Cropper from 'cropperjs'
let cropResults = []
let infos = {}
let canvas
let cropper = null
export default function cortar(image, data){
    if(cropper){
        cropper.destroy()
    }
    cropper = new Cropper(image, {
        ready(){
            this.cropper.setCropBoxData(data)
        },
        crop(event){
            infos = {
                left: event.detail.x,
                top: event.detail.y,
                width: event.detail.width,
                height: event.detail.height
            }
            canvas = this.cropper.getCroppedCanvas()
        },
        // destroy(){},
        aspectRatio: NaN,
        zoomable: false,
        // autoCrop: false
        // checkCrossOrigin: false,
        
    })

    //return cropper


    return cropResults = [cropper, infos, canvas]
}