export default function LoginPage() {
    return <>
        <div className="bg-white/50 mx-auto max-w-7xl">
            <h1 className="text-2xl font-bold">Login</h1>
            <form action="POST">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Username" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    </>
}