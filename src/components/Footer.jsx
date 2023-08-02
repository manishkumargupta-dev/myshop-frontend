const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container">
      <p className="text-center py-3">MyShop &copy; {currentYear}</p>
    </footer>
  );
};

export default Footer;
