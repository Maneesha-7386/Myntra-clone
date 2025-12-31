import { navbarMenuData } from "../data/navbarMenuData";
import { slugify } from "./slugs";

// Random helpers
const getRandomPrice = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const brands = [
    "Roadster", "Levis", "H&M", "Zara", "Nike", "Adidas", "Puma", "Mango",
    "Jack & Jones", "Wrogen", "Highlander", "HRX", "Mast & Harbour"
];
const images = {
    MEN: [
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/1364628/2016/8/31/11472636737718-Roadster-Men-Blue-Regular-Fit-Printed-Casual-Shirt-6121472636737160-1.jpg",
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/7488102/2019/8/22/8002a744-0dad-4dbb-9481-cf0090134c3b1566454086717-Dennis-Lingo-Men-Pink-Slim-Fit-Solid-Casual-Shirt-989156645-1.jpg",
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/1376577/2016/9/15/11473928353316-Roadster-Men-Black-Regular-Fit-Check-Casual-Shirt-4501473928353310-1.jpg"
    ],
    WOMEN: [
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2237581/2018/5/4/11525433792765-Roadster-Women-Tops-6821525433792613-1.jpg",
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/11176140/2020/7/28/73434685-6136-4022-870b-e48d3db874551595924619799-SASSAFRAS-Women-Fuchsia-Pink-Solid-A-Line-Kurta-3741595924-1.jpg",
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/productimage/2019/12/12/1a1e94f2-3b10-4152-8b6b-36802272e2fb1576102551329-1.jpg"
    ],
    KIDS: [
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/12377258/2020/9/11/ce1b7bcb-a65a-4eb0-a317-42ac02718f1e1599815479785-Urbano-Juniors-Boys-Jeans-4391599815478440-1.jpg",
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/15353722/2021/10/2/a7a22789-53b6-4993-847e-72d53bf596631633182888204-Cutiekins-Girls-Red--Gold-Toned-Sequin-Fit--Flare-Dress-39-1.jpg"
    ],
    HOME: [
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/productimage/2019/2/14/083f237f-689e-4f1b-aa3e-1b835e0240351550117075704-1.jpg",
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/11363658/2020/1/27/38f0d55e-2248-4cb2-834c-6ef66427d1131580126759086-Maspar-Gold-Toned-Textured-Handmade-Oval-Table-Lamp-806158-1.jpg"
    ],
    BEAUTY: [
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/1484252/2022/2/17/7474499b-d731-4a57-8178-028f804797431645094896706-Maybelline-New-York-Colossal-Bold-Liner---Black-957164509489-1.jpg",
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/1154546/2018/6/25/e88a096c-bacc-42d3-8326-de666324fa501529923831610-Lakme-Absolut-Matte-Lip-Color-Red-Rush-06-8961529923831498-1.jpg"
    ],
    GENZ: [
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/1700944/2019/6/8/972c9498-3a37-4d5d-976c-4493b4d5c0021559989322791-HRX-by-Hrithik-Roshan-Men-Yellow-Printed-Round-Neck-T-shirt--1.jpg"
    ]
};

const commonImages = [
    "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/14828822/2021/7/12/35928684-25a8-444a-a035-71cb148265081626087707328-H-M-Men-Black-Relaxed-Fit-T-shirt-5531626087706786-1.jpg",
    "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/1364628/2016/8/31/11472636737718-Roadster-Men-Blue-Regular-Fit-Printed-Casual-Shirt-6121472636737160-1.jpg",
    "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/7488102/2019/8/22/8002a744-0dad-4dbb-9481-cf0090134c3b1566454086717-Dennis-Lingo-Men-Pink-Slim-Fit-Solid-Casual-Shirt-989156645-1.jpg"
];

const getRate = () => (Math.random() * 2 + 3).toFixed(1);

const colors = ["Red", "Blue", "Black", "White", "Pink", "Green", "Yellow", "Orange", "Navy Blue", "Maroon"];

export const generateMockData = () => {
    let sectionedData = {
        home: {
            products: [],
            trendingNow: [],
            risingStars: [],
            shopByCategory: [],
            topPicks: [],
            fashionEssentials: []
        },
        men: { products: [] },
        women: { products: [] },
        kids: { products: [] },
        genz: { products: [] },
        beauty: { products: [] },
        homeLiving: { products: [] }
    };

    let allProducts = [];
    let idCounter = 1000;

    Object.keys(navbarMenuData).forEach(sectionKey => {
        const groups = navbarMenuData[sectionKey];
        const sectionImages = images[sectionKey] || commonImages;
        const apiSecKey = sectionKey.toLowerCase();

        if (!sectionedData[apiSecKey]) sectionedData[apiSecKey] = { products: [] };

        groups.forEach(group => {
            group.items.forEach(categoryName => {
                const numProducts = 8;
                for (let i = 0; i < numProducts; i++) {
                    const brand = brands[Math.floor(Math.random() * brands.length)];
                    const priceVal = getRandomPrice(499, 5000);
                    const originalPriceVal = priceVal + getRandomPrice(200, 2000);
                    const discountVal = Math.floor(((originalPriceVal - priceVal) / originalPriceVal) * 100);
                    const color = colors[Math.floor(Math.random() * colors.length)];

                    const product = {
                        id: String(idCounter++),
                        section: sectionKey, // MEN, WOMEN
                        category: categoryName, // T-Shirts, Tops, etc.
                        brand: brand,
                        color: color,
                        title: `${brand} ${categoryName} - ${i + 1}`,
                        price: `Rs. ${priceVal}`,
                        originalPrice: `Rs. ${originalPriceVal}`,
                        discount: `${discountVal}% OFF`,
                        rating: getRate(),
                        ratingCount: Math.floor(Math.random() * 5000),
                        image: sectionImages[i % sectionImages.length] || sectionImages[0],
                        isWishlisted: false,
                        tags: [sectionKey, categoryName, brand, color, group.title].map(s => s ? s.toLowerCase() : "")
                    };

                    allProducts.push(product);
                    sectionedData[apiSecKey].products.push(product);

                    // Populate home sections if it's MEN or WOMEN (common items)
                    if (sectionKey === "MEN" || sectionKey === "WOMEN") {
                        if (i % 5 === 0) sectionedData.home.trendingNow.push(product);
                        if (i % 7 === 1) sectionedData.home.risingStars.push(product);
                        if (i % 10 === 2) sectionedData.home.shopByCategory.push(product);
                    }
                }
            });
        });
    });

    // Handle aliases like home-living
    sectionedData["home-living"] = sectionedData.home;

    return sectionedData;
};
