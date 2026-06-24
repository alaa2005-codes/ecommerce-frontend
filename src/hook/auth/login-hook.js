const LoginHook = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isPress, setIsPress] = useState(false);

    const res = useSelector(state => state.authReducer.loginUser);

    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);

    const onSubmit = async () => {
        setIsPress(true);
        setLoading(true);

        await dispatch(loginUser({ email, password }));

        setLoading(false);
        setIsPress(false);
    };

    useEffect(() => {
        if (!loading && res) {

            console.log("LOGIN RESPONSE:", res);

            const data = res?.data;

            const token = data?.token;
            const user = data?.data;

            if (token) {
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                notify("تم تسجيل الدخول بنجاح", "success");

                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            } else if (data?.message) {
                notify("كلمة السر او الايميل خطا", "error");
            }

            setLoading(false);
        }
    }, [res]);

    return [email, password, loading, onChangeEmail, onChangePassword, onSubmit, isPress];
};