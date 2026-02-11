import { FileUpload } from 'primereact/fileupload';

export default function UploadHandler() {
    const customBase64Uploader = async (event: any) => {
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob());

        reader.readAsDataURL(blob);

        reader.onloadend = function () {
            const base64data = reader.result;
        };
    };

    return (
        <div className="card flex justify-content-center">
            <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload uploadHandler={customBase64Uploader} />
        </div>
    )
}
        