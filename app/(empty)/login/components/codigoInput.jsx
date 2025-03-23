import { useRef, useEffect, useState } from "react";

export default function CodigoInput({ setCodigo }) {
    const [error, setError] = useState("");

    function focusNextInput(el, nextId) {
        if (el.value.length > 0 && nextId) {
            document.getElementById(nextId).focus();
        }
    }

    useEffect(() => {
        document.querySelectorAll('[data-focus-input-init]').forEach((element) => {
            element.addEventListener('keyup', function (event) {
                const nextId = this.getAttribute('data-focus-input-next');
                if (event.key !== "Backspace") {
                    focusNextInput(this, nextId);
                }
                handleChange(); 
            });

            element.addEventListener('paste', function (event) {
                event.preventDefault();
                const pasteData = (event.clipboardData || window.clipboardData).getData('text');
                const digits = pasteData.replace(/\D/g, '').slice(0, 6); 

                const inputs = document.querySelectorAll('[data-focus-input-init]');
                inputs.forEach((input, index) => {
                    if (digits[index]) {
                        input.value = digits[index];
                    }
                });

                if (digits.length === 6) {
                    document.getElementById("code-6").focus();
                }

                handleChange(); 
            });
        });
    }, []);

    function handleChange() {
        const inputs = document.querySelectorAll('[data-focus-input-init]');
        const code = Array.from(inputs).map(input => input.value).join("");

        setCodigo(code); 
    }

    return (
        <div className="max-w-sm mx-auto">
            <div className="flex justify-center mb-2 space-x-2 rtl:space-x-reverse">
                {[...Array(6)].map((_, i) => (
                    <div key={i}>
                        <label htmlFor={`code-${i + 1}`} className="sr-only">
                            Code {i + 1}
                        </label>
                        <input
                            type="text"
                            maxLength="1"
                            data-focus-input-init
                            data-focus-input-next={i < 5 ? `code-${i + 2}` : null}
                            id={`code-${i + 1}`}
                            onChange={handleChange}
                            className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            required
                        />
                    </div>
                ))}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}
