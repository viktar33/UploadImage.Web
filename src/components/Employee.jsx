import React, {useEffect, useState} from 'react';


const defaultImage = 'http://simpleicon.com/wp-content/uploads/account.png';

const initialEmployee = {
    EmployeeId: 0,
    EmployeeName: '',
    Occupation: '',
    ImageName: '',
    ImageSrc: defaultImage,
    ImageFile:null
}


const Employee = () => {
    const[employees,setEmployees]=useState([])
    const [values, setValues] = useState(initialEmployee);
    const formData = new FormData();
    const changeImage = e => {
        if (e.target.files && e.target.files[0]) {
            let ImageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues(
                    {
                        ...values,
                        ImageFile,
                        ImageSrc: x.target.result
                    }
                )
            }
            reader.readAsDataURL(ImageFile)
        } else {
            setValues(
                {
                    ...values,
                    ImageFile: defaultImage,
                    ImageSrc: defaultImage
                }
            )
        }
    }

    useEffect(() => {
        fetch("https://localhost:7013/api/Employee")
            .then((employees) => employees.json())
            .then((employees) => setEmployees(employees))
    }, [employees.length]);

    console.log(employees)

    const addHandler = async (e) => {
        e.preventDefault()
        formData.append('employeeId',values.EmployeeId)
        formData.append('employeeName',values.EmployeeName)
        formData.append('occupation',values.Occupation)
        formData.append('imageName',values.ImageName)
        formData.append("ImageSrc",values.ImageSrc)
        formData.append('MyImageFile',values.ImageFile)
        console.log(formData.get("MyImageFile"))
        const options = {
            method: "POST",
            body: formData,
        };
        fetch("https://localhost:7013/api/Employee", options);
    };

    return (
        <>
        <form onSubmit={addHandler}>
            <h1> Добавление картинки</h1>
            <div>
                <img src={values.ImageSrc} style={{width: "200px", height: '200px'}} alt='img'/>
                <input type='file'  accept="image/*"  onChange={changeImage}/>
                <input placeholder='Name' value={values.EmployeeName}
                       onChange={(e) => setValues({...values, EmployeeName: e.target.value})}/>
                <input placeholder='Occupation' value={values.Occupation}
                       onChange={(e) => setValues({...values, Occupation: e.target.value})}/>
                <button type='submit'>Add</button>
            </div>
        </form>
            <div>
                <h1>Картинки из базы данных:</h1>
                {employees.map((employee) => (
                    <div style={{border:"5px solid blue"}}>
                   <div>{employee.employeeName}</div>
                        <div>{employee.occupation}</div>
                        <img alt="alt" style={{width:"50px",height:"50px"}} src={employee.imageSrc}/>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Employee;