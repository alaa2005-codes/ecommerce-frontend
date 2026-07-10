import React, { useState, useEffect } from 'react'
import { getOneCategory } from '../../redux/actions/subcategoryAction';
import { createProduct, getOneProduct } from '../../redux/actions/productsAction';
import notify from './../../hook/useNotifaction';
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategory } from '../../redux/actions/categoryAction'
import { getAllBrand } from './../../redux/actions/brandAction';
import { updateProducts } from './../../redux/actions/productsAction';
import baseUrl from './../../Api/baseURL';

const AdminEditProductsHook = (id) => {

    const dispatch = useDispatch();
    useEffect(() => {
        const run = async () => {
            await dispatch(getOneProduct(id))
            await dispatch(getAllCategory(50));
            await dispatch(getAllBrand(50));
        }
        run();
    }, [])

    //get one product details
    const item = useSelector((state) => state.allproducts.oneProduct)
    //get last catgeory state from redux
    const category = useSelector(state => state.allCategory.category)
    //get last brand state from redux
    const brand = useSelector(state => state.allBrand.brand)

    //get last sub cat state from redux
    const subCat = useSelector(state => state.subCategory.subcategory)

    const onSelect = (selectedList) => {
        setSeletedSubID(selectedList)
    }
    const onRemove = (selectedList) => {
        setSeletedSubID(selectedList)
    }

    const [options, setOptions] = useState([]);

    //values images products
    const [images, setImages] = useState({});
    //values state
    const [prodName, setProdName] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [priceBefore, setPriceBefore] = useState('السعر قبل الخصم');
    const [priceAftr, setPriceAftr] = useState('السعر بعد الخصم');
    const [qty, setQty] = useState('الكمية المتاحة');
    const [CatID, setCatID] = useState('0');
    const [BrandID, SetBrandID] = useState('0');
    const [subCatID, setSubCatID] = useState([]);
    const [seletedSubID, setSeletedSubID] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (item && item.data) {
            const productData = item.data || {};
            const convertedImages = {};
            (Array.isArray(productData.images) ? productData.images : []).forEach((img, index) => {
                convertedImages[index] = img;
            });
            setImages(convertedImages);
            setProdName(productData.title || '');
            setProdDescription(productData.description || '');
            setPriceBefore(productData.price || 0);
            setQty(productData.quantity || 0);
            setCatID(productData.category || '0');
            SetBrandID(productData.brand || '0');
            setColors(Array.isArray(productData.availableColors) ? productData.availableColors : []);
            setSeletedSubID(Array.isArray(productData.subCategory) ? productData.subCategory : []);
        }
    }, [item])


    //to change name state
    const onChangeProdName = (event) => {
        event.persist();
        setProdName(event.target.value)
    }
    //to change name state
    const onChangeDesName = (event) => {
        event.persist();
        setProdDescription(event.target.value)
    }
    //to change name state
    const onChangePriceBefor = (event) => {
        event.persist();
        setPriceBefore(event.target.value)
    }
    //to change name state
    const onChangePriceAfter = (event) => {
        event.persist();
        setPriceAftr(event.target.value)
    }  //to change name state
    const onChangeQty = (event) => {
        event.persist();
        setQty(event.target.value)
    }
    const onChangeColor = (event) => {
        event.persist();
        setShowColor(!showColor)
    }

    //to show hide color picker
    const [showColor, setShowColor] = useState(false);
    //to store all pick color
    const [colors, setColors] = useState([]);
    //when choose new color
    const handelChangeComplete = (color) => {
        setColors([...colors, color.hex])
        setShowColor(!showColor)
    }
    const removeColor = (color) => {
        const newColor = colors.filter((e) => e !== color)
        setColors(newColor)
    }



    //when selet category store id
    const onSeletCategory = async (e) => {
        setCatID(e.target.value)
    }
    useEffect(() => {
        if (CatID != 0) {
            const run = async () => {
                await dispatch(getOneCategory(CatID))
            }
            run();
        }
    }, [CatID])

    useEffect(() => {
        if (subCat && Array.isArray(subCat.data)) {
            setOptions(subCat.data)
        } else {
            setOptions([])
        }
    }, [subCat])




    //when selet brand store id
    const onSeletBrand = (e) => {
        SetBrandID(e.target.value)
    }

    //to convert base 64 to file
    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    //convert url to file
    const convertURLtoFile = async (url) => {
        const response = await fetch(url, { mode: "cors" });
        const data = await response.blob();
        const ext = url.split(".").pop();
        const filename = url.split("/").pop();
        const metadata = { type: `image/${ext}` };
        return new File([data], Math.random(), metadata);
    };

    //to save data 
    const handelSubmit = async (e) => {
        e.preventDefault();
        const imageKeys = Object.keys(images || {});
        if (CatID === '' || CatID === '0' || prodName === "" || prodDescription === "" || imageKeys.length === 0 || priceBefore <= 0 || priceBefore === 'السعر قبل الخصم') {
            notify("من فضلك اكمل البيانات", "warn")
            return;
        }

        const imageValues = Object.values(images);
        let imgCover;
        if (imageValues[0].length <= 1000) {
            imgCover = await convertURLtoFile(imageValues[0])
        } else {
            imgCover = dataURLtoFile(imageValues[0], Math.random() + ".png")
        }

        let itemImages = []
        for (let i = 0; i < imageValues.length; i++) {
            if (imageValues[i].length <= 1000) {
                const file = await convertURLtoFile(imageValues[i])
                itemImages.push(file)
            } else {
                itemImages.push(dataURLtoFile(imageValues[i], Math.random() + ".png"))
            }
        }

        const formData = new FormData();
        formData.append("title", prodName);
        formData.append("description", prodDescription);
        formData.append("quantity", qty);
        formData.append("price", priceBefore);

        formData.append("category", CatID);
        formData.append("brand", BrandID);

        formData.append("imageCover", imgCover);
        itemImages.map((item) => formData.append("images", item))

        colors.map((color) => formData.append("availableColors", color))
        seletedSubID.map((item) => formData.append("subcategory", item._id))
        setLoading(true)
        await dispatch(updateProducts(id, formData))
        setLoading(false)

    }

    //get create meesage
    const product = useSelector(state => state.allproducts.updateProducts)

    useEffect(() => {

        if (loading === false) {
            //setCatID(0)
            setColors([])
            setImages({})
            setProdName('')
            setProdDescription('')
            setPriceBefore('السعر قبل الخصم')
            setPriceAftr('السعر بعد الخصم')
            setQty('الكمية المتاحة')
            SetBrandID(0)
            setSeletedSubID([])
            setTimeout(() => setLoading(true), 1500)

            if (product) {
                if (product.status === 200) {
                    notify("تم التعديل بنجاح", "success")
                } else {
                    notify("هناك مشكله", "error")
                }
            }
        }
    }, [loading])


    return [CatID, BrandID, onChangeDesName, onChangeQty, onChangeColor, onChangePriceAfter, onChangePriceBefor, onChangeProdName, showColor, category, brand, priceAftr, images, setImages, onSelect, onRemove, options, handelChangeComplete, removeColor, onSeletCategory, handelSubmit, onSeletBrand, colors, priceBefore, qty, prodDescription, prodName]

}

export default AdminEditProductsHook