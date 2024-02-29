function Logo({ width = 50, rounded = "rounded-full", className = "" }) {
  return (
    <>
      <figure className={`${className}`}>
        <img
          className={`${rounded} cursor-pointer`}
          src="https://www.pointbleudesign.com/wp-content/uploads/2019/12/03_Brand_Logo_Makeovers_Blog_PB_BLOG-copia-2-768x453.jpg"
          alt="brand-logo"
          width={width}
          title="brand-logo"
        />
      </figure>
    </>
  );
}

export default Logo;
