const { Link } = ReactRouterDOM

export function AppFooter() {
    return (
        <React.Fragment>
            <Link to="/">
                <div className="logo flex align-center pointer"><img src="././img/logo1.png" />
                <p> &#169; Shany Pollack & Michael Uzan</p>
                </div>
            </Link>
        </React.Fragment>
    )
}