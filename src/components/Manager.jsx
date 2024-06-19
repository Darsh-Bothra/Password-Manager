import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function Manager() {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" })

    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, [])

    const handleCopy = (text) => {
        toast('🦄 Text copied', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }

    const showPass = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("public/eyecross.png")) {
            ref.current.src = "public/visible.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "public/eyecross.png"
            passwordRef.current.type = "text"
        }
    }

    const savePass = () => {
        if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form])
            setForm({ site: "", username: "", password: "" })
            toast('🦄 Password saved successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else toast('Password not saved! Lenght of  each field should be atleast 4')
    }
    const delPass = (id) => {
        let c = confirm("Do you really want to delete the password");
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('🦄 Password Deleted successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    const editPass = (id) => {
        setForm(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
        toast('🦄 Password Edited successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        // setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        // console.log([...passwordArray, form])
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value, })
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-orange-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-orange-400 opacity-20 blur-[100px]"></div></div>


            <div className="bg-orange-100 mycontainer">
                <h1 className='text-4xl text font-bold text-center'><span className='text-orange-700'>&lt;</span>
                    Pas
                    <span className='text-orange-700'>00&gt;</span>
                </h1>

                <p className='text-orange-900 text-lg text-center'>Your Password manager</p>

                <div className="flex flex-col justify-center p-4 gap-7 text-black items-center">
                    <input onChange={handleChange} value={form.site} placeholder='Enter website URL' className='rounded-full border border-orange-500 w-full p-4 py-1' type="text" name="site" id="" />

                    <div className='flex w-full justify-between gap-3'>
                        <input onChange={handleChange} value={form.username} placeholder='Enter username' className='rounded-full border border-orange-500 p-4 py-1 w-full' type="text" name="username" />

                        <div className="relative">
                            <input ref={passwordRef} onChange={handleChange} value={form.password} placeholder='Enter password' className='rounded-full border border-orange-500 w-full p-4 py-1' type="password" name='password' />
                            <span className='absolute right-0 top-0 cursor-pointer' onClick={showPass}>
                                <img ref={ref} className='p-1 mb-4 mr-2 mt-0.5' width={30} src="public/visible.png" alt="eye" />
                            </span>
                        </div>

                    </div>
                    <button onClick={savePass} className='flex justify-center items-center border border-black bg-orange-500 hover:bg-orange-600 rounded-full px-2 py-2 w-20 h-[40px] gap-2'><lord-icon
                        src="https://cdn.lordicon.com/slmechys.json"
                        trigger="hover">
                    </lord-icon></button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-xl py-3'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length !== 0 &&
                        <table className="table-auto w-full rounded-lg overflow-hidden">
                            <thead className=' bg-orange-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-orange-200'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='text-center py-2 gap-3'>
                                            <div className='flex items-center justify-center'>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => handleCopy(item.site)}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover"
                                                    >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 gap-3'>
                                            <div className='flex items-center justify-center'>
                                                <span>{item.username}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => handleCopy(item.username)}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover"
                                                    >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 gap-3'>
                                            <div className='flex items-center justify-center'>
                                                <span>{item.password}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => handleCopy(item.password)}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover"
                                                    >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='justify-center text-center py-2 gap-3'>
                                            <span onClick={() => { editPass(item.id) }} className='mx-2 cursor-pointer'>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                            </span>
                                            <span onClick={() => delPass(item.id)} className='mx-2 cursor-pointer'>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager