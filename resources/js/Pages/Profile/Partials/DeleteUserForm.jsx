import { useRef, useState } from "react";
import DangerButton from "@/Components/Breeze/DangerButton";
import InputError from "@/Components/Breeze/InputError";
import InputLabel from "@/Components/Breeze/InputLabel";
import Modal from "@/Components/Breeze/Modal";
import SecondaryButton from "@/Components/Breeze/SecondaryButton";
import TextInput from "@/Components/Breeze/TextInput";
import { useForm } from "@inertiajs/react";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Ștergeți contul
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ștergeți-vă contul permanent. Această acțiune nu poate fi
                    anulată ulterior.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                Ștergeți contul
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Sunteți sigur că doriți să ștergeți contul?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Odată ce contul dvs. este șters, toate resursele sale și
                        datele vor fi șterse definitiv. Vă rugăm să introduceți
                        parola pentru a confirmare.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Anuleaza
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Ștergeți contul
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
