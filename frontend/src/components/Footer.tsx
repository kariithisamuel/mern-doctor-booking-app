const Footer = () => {
    return <div className="bg-violet-800 py-10">
        <div className="container mx-auto flex justify-between items-cennter">
            <span className="text-3xl text-white font-bold tracking-tight" style={{ fontFamily: 'Merriweather, serif' }}>
                DocBook.com
            </span>
            <span className="text-black font-bold tracking-tight flex gap-4">
                <p className="corsor-pointer">Privacy policy</p>
                <p className="corsor-pointer">Terms of service</p>
            </span>
        </div>
    </div>
};

export default Footer;