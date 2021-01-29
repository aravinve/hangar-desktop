import {useState, useEffect} from 'react'

function TodoDrop({listItems, defaultTitle, defaultIcon, setValueFunction}) {

    const [title, setTitle] = useState(defaultTitle)
    const [icon, setIcon] = useState(defaultIcon)
    const [openPane, setOpenPane] = useState(false)

    useEffect(() => {
        setValueFunction({
            title: title,
            icon: icon
        })
    }, [title, icon])

    const selectOption = (item) => {
        setTitle(item.title)
        setIcon(item.icon)
        setOpenPane(!openPane)
    }

    const toggleSelectPane = (e) => {
        let target = e.currentTarget.parentElement;
        if (!openPane) {
            target.style.width = "11rem";
        } else {
            target.style.width = "auto";
        }
        setOpenPane(!openPane)
    }
    
    const selectOptions = listItems.map((item, index) => (
        <div key={index} className=" cursor-pointer flex-auto p-2 mt-2 mb-1 bg-body" onClick={(e) => selectOption(item)}>
            <div className="inline-flex flex-row items-center justify-center">
                <i className={`${item.icon} mr-2`}></i>
                <span className="text-sm text-primary">
                    {item.title}
                </span>
            </div>
        </div>
    ))

    return (
        <div className="w-full flex flex-row justify-center bg-body border-primary p-2 focus:outline-none outline-none rounded-sm shadow-md">
            <div className="flex-auto cursor-pointer inline-flex items-center justify-between">
                <div className="inline-flex flex-row items-center justify-center">
                    <i className={`${icon} mr-2`}></i>
                    <span className="text-primary text-md">
                        {title}
                    </span>
                </div>
                <div onClick={toggleSelectPane}>
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            {openPane ? (<div className="absolute w-48 mt-8 flex flex-col justify-center z-40 rounded-b-sm shadow-sm bg-body border-t-0 border-primary text-primary">
                {selectOptions}
            </div>) : null}
        </div>
    )
}

export default TodoDrop
