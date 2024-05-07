import { useRef, useState, useEffect } from "react";
import InputError from "@/Components/Breeze/InputError";
import InputLabel from "@/Components/Breeze/InputLabel";
import PrimaryButton from "@/Components/Breeze/PrimaryButton";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { Inertia } from "@inertiajs/inertia";

export default function UpdatePicture({ className = "", profile_picture }) {
    const pictureInput = useRef();
    const [image, setImage] = useState(null);

    const { data, setData, errors, reset, processing, recentlySuccessful } =
        useForm();
    useEffect(() => {
        if (image !== data.picture) {
            setData("picture", image);
        }
    }, [image, data.picture, setData]);

    const updatePicture = (e) => {
        e.preventDefault();

        if (!pictureInput.current.files[0]) {
            return;
        }

        const formData = new FormData();
        formData.append("picture", pictureInput.current.files[0]);

        Inertia.post("/profile/update-profile-picture", formData);
    };
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Schimba fotografia de profil
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Alege o fotografie de profil care să te reprezinte.
                </p>
                <p className="mt-1 text-sm text-gray-600">
                    Fotografia actuala:
                </p>
                <img
                    className="profile-picture-dashboard"
                    src={profile_picture}
                    alt="profile picture"
                />
            </header>

            <form
                onSubmit={updatePicture}
                encType="multipart/form-data"
                className="mt-6 space-y-6"
            >
                <div>
                    <InputLabel
                        htmlFor="picture"
                        value="Fotografia de profil"
                    />
                    <input
                        id="picture"
                        ref={pictureInput}
                        type="file"
                        name="picture"
                        className="mt-1 block w-full"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        Salveaza
                    </PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Salvat.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
