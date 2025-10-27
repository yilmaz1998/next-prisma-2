import { prisma } from "../src/lib/prisma"


async function main() {
    const cocktails = [
        { name: "Margarita", imageUrl: "https://cdn.loveandlemons.com/wp-content/uploads/2024/04/margarita-recipe.jpg", ingredients: "Tequila, lime juice, triple sec" },
        { name: "Mojito", imageUrl: "https://cookieandkate.com/images/2020/08/best-mojito-recipe-2.jpg", ingredients: "Rum, mint, sugar, lime juice" },
        { name: "Negroni", imageUrl: "https://punchdrink.com/wp-content/uploads/2013/10/Artice2-Kingston-Negroni-Rum-Cocktail-Recipe.jpg?w=800", ingredients: "Gin, vermouth rosso, Campari" },
        { name: "Cosmopolitan", imageUrl:"https://www.simplejoy.com/wp-content/uploads/2023/10/Cosmopolitan-Drink.jpg", ingredients: "Vodka, triple sec, cranberry juice, lime juice" },
        { name: "Old Fashioned", imageUrl:"https://assets.epicurious.com/photos/5e41a6d175661800087cc87c/1:1/w_2560%2Cc_limit/OldFashioned_HERO_020520_619.jpg", ingredients: "Bourbon, sugar, bitters, orange peel" },
        { name: "Martini", imageUrl:"https://assets.epicurious.com/photos/65848442ce8ae033680cd8a2/1:1/w_5001,h_5001,c_limit/Vodka-Martini_RECIPE.jpg", ingredients: "Gin or Vodka, dry vermouth, olive or lemon twist" },
        { name: "Whiskey Sour", imageUrl:"https://www.myforkinglife.com/wp-content/uploads/2025/03/whiskey-sour-photos-1-01.jpg", ingredients: "Whiskey, lemon juice, sugar, egg white" },
        { name: "Pina Colada", imageUrl:"https://creative-culinary.com/wp-content/uploads/pina-colada-2.jpg", ingredients: "Rum, coconut cream, pineapple juice" },
        { name: "Daiquiri", imageUrl: "https://punchdrink.com/wp-content/uploads/2014/01/key-daiquiri.jpg?w=1000", ingredients: "Rum, lime juice, sugar" },
        { name: "Mai Tai", imageUrl:"https://www.liquor.com/thmb/dxEIgDSkmAAUbWzJ9yi8Ws_J-v8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mai-tai-720x720-primary-e09e24f1cacd4b3896f5aa32ba51dcdd.jpg", ingredients: "Rum, lime juice, orgeat, orange liqueur" },
        { name: "Bloody Mary", imageUrl:"https://assets.epicurious.com/photos/6509dc536eab39953299f6c1/16:9/w_7280,h_4095,c_limit/Bloody-Mary_Recipe.jpg", ingredients: "Vodka, tomato juice, spices" },
        { name: "Gin and Tonic", imageUrl:"https://www.liquor.com/thmb/sYX_sTKUpyagRermLA31SMLF3-8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__liquor__2019__09__18090535__Gin-and-Tonic-720x720-recipe-c2e32c4cf53c4ed7a4de20af8e862a12.jpg", ingredients: "Gin, tonic water, lime" },
        { name: "Long Island Iced Tea", imageUrl:"https://www.long-island-iced-tea.com/images/long-island-iced-tea-cocktail2.jpg", ingredients: "Vodka, tequila, rum, gin, triple sec, cola" },
        { name: "Tom Collins", imageUrl:"https://www.liquor.com/thmb/WfWXl212HDQhTHJX_LphwlZFX4c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/LQR-tomcollins-original-4000x4000-680e282529a34b30ac4b8ed495168109.jpg", ingredients: "Gin, lemon juice, sugar, soda" },
        { name: "Caipirinha", imageUrl:"https://assets.epicurious.com/photos/579a2d8e437fcffe02f7230b/master/pass/caipirinha-072816.jpg", ingredients: "Cachaça, lime, sugar" },
        { name: "Manhattan", imageUrl:"https://www.pamperedchef.com/iceberg/com/recipe/1445550-lg.jpg", ingredients: "Whiskey, sweet vermouth, bitters" },
        { name: "Sidecar", imageUrl:"https://imbibemagazine.com/wp-content/uploads/2022/02/web-brandy-sidecar-crdt-john-valls.jpg", ingredients: "Cognac, triple sec, lemon juice" },
        { name: "Aperol Spritz", imageUrl:"https://www.aperol.com/app/uploads/2023/05/perfekte-spritz.jpg", ingredients: "Aperol, prosecco, soda" },
        { name: "Espresso Martini", imageUrl:"https://assets.kahlua.com/wp-content/uploads/2023/11/Espresso-Martini-Hand-1x1-1.jpg?tr=q-80,w-1076", ingredients: "Vodka, coffee liqueur, espresso" },
        { name: "French 75", imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd-hSfApzQAG0rFRbvtaCbUnh1WssOA82s0Q&s", ingredients: "Gin, lemon juice, sugar, champagne" },
        { name: "Paloma", imageUrl:"https://www.southernliving.com/thmb/pn9NrRsTpG-U1xpRyIN90C5wcJw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Southern-Living-Paloma--Step-4-1769-84d74c08ebca4c0fba05cbce1d75c3d3.jpg", ingredients: "Tequila, grapefruit soda, lime" },
        { name: "Sazerac", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/f/fc/SazeracCocktail.jpg", ingredients: "Rye whiskey, absinthe, sugar, bitters" },
        { name: "Clover Club", imageUrl:"https://mixthatdrink.com/wp-content/uploads/2023/03/clover-club-cocktail-540x720.jpg", ingredients: "Gin, raspberry syrup, lemon juice, egg white" },
        { name: "Rum Punch", imageUrl:"https://sugarandcloth.com/wp-content/uploads/2021/10/Rum-punch-8_compressed.jpg", ingredients: "Rum, fruit juices, grenadine" },
        { name: "Pisco Sour", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/2/27/Pisco_sour_20100613b.JPG", ingredients: "Pisco, lime juice, sugar, egg white" },
        { name: "Planter's Punch", imageUrl:"https://aclassictwist.com/wp-content/uploads/2024/06/planters-punch-13-720x720.jpg", ingredients: "Dark rum, orange juice, pineapple juice, sour mix, grenadine" },
        { name: "Boulevardier", imageUrl:"https://www.liquor.com/thmb/LV0L3CF51hFJoSN-QdLe6ijXsFQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__liquor__2019__09__12094720__Boulevardier-720x720-recipe-53da547e8cfc4bd79a393ac99891f5ba.jpg", ingredients: "Bourbon, sweet vermouth, Campari" },
        { name: "Mint Julep", imageUrl:"https://www.inspiredtaste.net/wp-content/uploads/2024/04/Mint-Julep-Recipe-2.jpg", ingredients: "Bourbon, mint, sugar, water" },
        { name: "Irish Coffee", imageUrl:"https://www.thespruceeats.com/thmb/BaTQiJBdsmkbQvBZO6HaoeBoNgE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/original-irish-coffee-recipe-759311-Hero-5b759d4b46e0fb005089915e.jpg", ingredients: "Irish whiskey, coffee, sugar, cream" },
        { name: "Sex on the Beach", imageUrl:"https://mixthatdrink.com/wp-content/uploads/2009/04/sex-on-the-beach-drink-735x1102.jpg", ingredients: "Vodka, peach schnapps, cranberry juice, orange juice" },
        { name: "Blue Lagoon", imageUrl:"https://res.cloudinary.com/htt8g4cd/image/upload/w_1920,h_1280,c_lfill,ar_3:2,g_center,f_auto,q_auto/wp/03_23_blue_lagoon_cocktail_hero_antonisachilleos_1920x1280", ingredients: "Vodka, blue curaçao, lemonade" },
        { name: "Tequila Sunrise", imageUrl:"https://www.allrecipes.com/thmb/zL0-Fqh_E_Z9vuMMhiV8hbNumTc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/222510-Tequila-Sunrise-Cocktail-ddmfs-4x3-0872-7ddefb6ec8ed40d0930e5b92f178e2cf.jpg", ingredients: "Tequila, orange juice, grenadine" },
        { name: "Harvey Wallbanger",imageUrl:"https://images.immediate.co.uk/production/volatile/sites/30/2020/10/Harvey-Wallbanger-d491f7c.jpg?quality=90&resize=708,643", ingredients: "Vodka, orange juice, Galliano" },
        { name: "Bellini", imageUrl:"https://cookieandkate.com/images/2019/07/best-peach-bellini-recipe-4.jpg",  ingredients: "Prosecco, peach puree" },
        { name: "Mimosa", imageUrl:"https://www.theendlessmeal.com/wp-content/uploads/2012/03/Mimosa-3.jpg",  ingredients: "Champagne, orange juice" },
        { name: "White Russian", imageUrl: "https://www.thespruceeats.com/thmb/4-cl74JRvv_E16iFHJTpwTG7zlA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-russian-recipe-761274-Hero_02-e1b64f0eac1f4b94b9dbe94fc66d83a8.jpg", ingredients: "Vodka, coffee liqueur, cream" },
        { name: "Black Russian", imageUrl: "https://www.tastingtable.com/img/gallery/classic-black-russian-cocktail-recipe/l-intro-1683308949.jpg", ingredients: "Vodka, coffee liqueur" },
        { name: "Caipiroska", imageUrl:"https://www.thebottleclub.com/cdn/shop/articles/TBC_recipe_image_2_0b4d809f-4bf6-40e2-91fb-3b51c09c3caa-429021.jpg?v=1707229444", ingredients: "Vodka, lime, sugar" },
        { name: "Rum Runner", imageUrl:"https://cookingwithcurls.com/wp-content/uploads/2020/06/This-tropical-Rum-Runner-Recipe-might-just-turn-all-of-your-friends-into-pirates.-cookingwithcurls.com_-1.jpg", ingredients: "Rums, banana liqueur, berry liqueur, pineapple juice, grenadine" },
        { name: "Blue Hawaiian", imageUrl:"https://www.liquor.com/thmb/u9xgStHYc0Oy_qrapcMmmwZVJs8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__liquor__2019__05__01120413__blue-hawaiian-720x720-recipe-50e8ba44935a4fc4a874d1b0e27b8b30.jpg", ingredients: "Rum, blue curaçao, pineapple juice, coconut cream" },
        { name: "Brandy Alexander", imageUrl:"https://images.ctfassets.net/6xd9bjrzzm9l/b93d0854c4517288afa69de2a127eba5/775d9ffba8bf6d428a518a208e28f99e/brandy-alexander.jpg?w=420&fm=webp&fit=pad&q=100", ingredients: "Brandy, dark creme de cacao, cream" },
        { name: "Vesper",imageUrl:"https://www.foodandwine.com/thmb/DsdTDh7fbJ8Zb5WK_ETAJNLz9Mk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Vesper_Martini_v2_Credit_Tim_Nusog-02-dc183f72ec284d6fb3faa3cd96f77017.jpg",  ingredients: "Gin, vodka, Lillet Blanc" },
        { name: "Hurricane",imageUrl:"https://louisianacookin.com/wp-content/uploads/2014/07/Hurricane.jpg",  ingredients: "Rum, passion fruit juice, orange juice, lime juice, grenadine" },
        { name: "Cuba Libre",imageUrl:"https://www.absolutdrinks.com/wp-content/uploads/recipe_cuba-libre_1x1_3f82a62b4857ea369e118a9ec5129e16.jpg",  ingredients: "Rum, cola, lime" },
        { name: "Rusty Nail",imageUrl:"https://www.thebottleclub.com/cdn/shop/articles/TBC_recipe_image_8_204159a5-0858-4988-99ef-ee4a59c5dfe6-595090.jpg?v=1707230459",  ingredients: "Scotch, Drambuie" },
        { name: "Godmother", imageUrl:"https://www.liquor.com/thmb/v3haeUklh-4xbBf0foamaBW3ars=/440x440/filters:no_upscale():max_bytes(150000):strip_icc()/vanilla-bourbon-720x720-primary-8a85ae454a13439982a4e107cf5c1798.jpg", ingredients: "Vodka, amaretto" },
        { name: "French Martini", imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHLe1-7Y7LsUdBy0KGVwkGUY1HzC1Hl71KCQ&s", ingredients: "Vodka, raspberry liqueur, pineapple juice" },
        { name: "Kamikaze",imageUrl:"https://images.squarespace-cdn.com/content/v1/62503525c8ea875b7ae0638e/1661794712858-6QNZDMG4R5D0KNRSJUKJ/Kamikazee.jpg",  ingredients: "Vodka, triple sec, lime juice" },
        { name: "Lemon Drop Martini", imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo5UmONX6oH_6qSRgyzoN3GmGO2d2haOx6mA&s", ingredients: "Vodka, triple sec, lemon juice, sugar" },
        { name: "Appletini", imageUrl:"https://amandascookin.com/wp-content/uploads/2020/04/appletini-cocktail-recipe-RC.jpg", ingredients: "Vodka, apple schnapps, sour mix, apple juice" },
        { name: "Chocolate Martini", imageUrl:"https://www.simplyrecipes.com/thmb/SohrqNL1IynPh0FIxl5xpyvyEi8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3Q4A1927-92b5e617a59642539ef38f5c51cc3975.jpg", ingredients: "Vodka, chocolate liqueur" },
        { name: "Sea Breeze", imageUrl:"https://bellyfull.net/wp-content/uploads/2021/04/Seabreeze-Cocktail-blog-768x1024.jpg", ingredients: "Vodka, cranberry juice, grapefruit juice" },
        { name: "Bay Breeze", imageUrl:"https://www.liquor.com/thmb/Bb93dboT4rCtqmmeD47uc8Baux8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/bay-breeze-720x720-primary-71e18f7fb89d4745bdf70c8f043496dc.jpg", ingredients: "Vodka, cranberry juice, pineapple juice" },
        { name: "Woo Woo", imageUrl:"https://www.thespruceeats.com/thmb/OSwWR8mc7yy4N6wtrAz4dK8w888=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-woo-woo-cocktail-recipe-759852-hero-01-1a98420883d744518339ae4ee678508c.jpg", ingredients: "Vodka, peach schnapps, cranberry juice" },
        { name: "Melon Ball", imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJQ-9RaH9XNt6vAkkOT3ngemgG6SqrgDM6QA&s", ingredients: "Vodka, midori, orange juice" },
        { name: "Fuzzy Navel",imageUrl:"https://www.thespruceeats.com/thmb/OAfTiWGgy9NfVfIVyH5EdRa2P00=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/_fuzzy-navel-cocktail-759298-hero-5bc4e64c46e0fb0026baa588.jpg",  ingredients: "Peach schnapps, orange juice" },
        { name: "Hairy Navel", imageUrl:"https://www.liquor.com/thmb/ZnPo_FvwixsoxicsGrZkv7xXHho=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/hairy-navel-720x720-primary-76d1528a7fc54fbc9e93c2521ecef5f0.jpg", ingredients: "Vodka, peach schnapps, orange juice" },
        { name: "Painkiller", imageUrl:"https://mixthatdrink.com/wp-content/uploads/2009/07/painkiller-drink-2-735x1103.jpg", ingredients: "Rum, pineapple juice, orange juice, cream of coconut" },
        { name: "Frozen Margarita",imageUrl:"https://www.saveur.com/uploads/2013/05/Photo-Murray-Hall-Food-Styling-Tyna-Hoang-240726-saveur-murrayhall-12-frozen-limeade-margarita-008-scaled.jpg?auto=webp",  ingredients: "Tequila, lime, triple sec, ice" },
        { name: "Frozen Daiquiri",imageUrl:"https://assets.epicurious.com/photos/644abab1ffb3de465867f434/1:1/w_3091,h_3091,c_limit/FrozenDaiquiri_RECIPE_042623_52231_VOG_final.jpg",  ingredients: "Rum, lime, sugar, ice" },
        { name: "Pisco Punch",imageUrl:"https://olenkacooks.com/wp-content/uploads/2024/02/pisco-punch.jpg", ingredients: "Pisco, lemon juice, sugar, pineapple juice" },
        { name: "Tequila Slammer", imageUrl:"https://olmecaaltos.com/wp-content/uploads/2023/05/tequila-slammer.webp", ingredients: "Tequila, lemon-lime soda" },
        { name: "Bramble",imageUrl:"https://hips.hearstapps.com/hmg-prod/images/classic-bramble-index-web-038-aa-del059925-68517d31c67d7.jpg?crop=0.891xw:1.00xh;0.0554xw,0",  ingredients: "Gin, lemon juice, sugar syrup, blackberry liqueur" },
        { name: "Godchild", imageUrl:"https://images.ctfassets.net/3s5io6mnxfqz/7HBuvjIUA2eJ14alWb5PcA/f07816d03a3de72a0a54792458677724/AdobeStock_389706849.jpeg", ingredients: "Vodka, Amaretto, cream" },
        { name: "Cherry Blossom", imageUrl:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi-THY8wUS7JEq6BxpAFb8dW_BhHzlGpFOkT_shxaeNoeCn6G3JU9q91U1ZwvqYejuuUcsggqy9t8g8t_Fjrh2F6M_Ab6EARihZXmwlL07sikX577XFGrPObvcdlKsB03PLeXHSB7qolMwm/s1600/aIMG_6883fvert+690.jpg", ingredients: "Gin, cherry liqueur, lemon juice" },
        { name: "Amaretto Sour",imageUrl:"https://eightforestlane.com/wp-content/uploads/2025/02/Amaretto-Sour_SQ-1.jpg",  ingredients: "Amaretto, lemon juice, sugar" },
        { name: "Aviation", imageUrl:"https://www.tasteofhome.com/wp-content/uploads/2024/06/Aviation_EXPS_TOHVP24_276608_MR_05_24_2.jpg", ingredients: "Gin, maraschino liqueur, lemon juice, creme de violette" },
        { name: "Rum Flip", imageUrl:"https://www.liquor.com/thmb/cQu0Tmn5fPrIAyTjQObFRQyECvE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rum-flip-720x720-primary-8b0b50516ade4542b2ed038f45042811.jpg", ingredients: "Rum, heavy cream, egg, sugar" },
        { name: "Coconut Mojito", imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNLgcBbvYbioq4ufAtADnPO_bZiWJJXevBFw&s", ingredients: "Rum, coconut, mint, lime, sugar" },
        { name: "Gimlet", imageUrl:"https://www.liquor.com/thmb/mi0oeRqiuSED3lwQOOWgjZY493s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Gimlet-1500x1500-hero-7af9450103b9437d8d5b7206a6ddfe43.jpg", ingredients: "Gin, lime juice, sugar syrup" },
        { name: "Royal Bermuda", imageUrl:"https://robbreport.com/wp-content/uploads/2025/05/royal_bermuda_yacht_club_cocktail.jpg", ingredients: "Rum, falernium, orange curacao, lime juice" },
        { name: "John Collins", imageUrl:"https://www.acouplecooks.com/wp-content/uploads/2021/10/John-Collins-Cocktail-002.jpg", ingredients: "Whiskey, lemon juice, sugar, soda" },
        { name: "Strawberry Fizz", imageUrl:"https://cdn11.bigcommerce.com/s-5ljyj9oebs/images/stencil/600x600/products/2928/16824/P080322230906_1__13250.1690316508.jpg?c=2", ingredients: "Gin, strawberries, mint, soda, sugar" },
        { name: "Cucumber Cooler", imageUrl:"https://www.marthastewart.com/thmb/-eMaRoJEb_ky-8ZMeSTPh7HlCjE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MS-355822cucumber-cooler-2x3-470a67bb48db432fb93f946b8d0f9eaf.jpg", ingredients: "Gin, cucumber, lime, soda" },
        { name: "Spicy Margarita",imageUrl:"https://www.yellowblissroad.com/wp-content/uploads/2023/07/Spicy-Margarita-social.jpg",  ingredients: "Tequila, lime juice, triple sec, jalapeño" },
        { name: "Blackberry Bourbon Smash", imageUrl:"https://www.resplendentkitchen.com/wp-content/uploads/2024/06/Blackberry-Bourbon-Smash_Resplendent-Kitchen_05791.jpg", ingredients: "Bourbon, blackberries, sugar, mint, lemon juice, soda" },
        { name: "Honey Whiskey Lemonade", imageUrl:"https://www.cookswithcocktails.com/wp-content/uploads/2018/07/lemonade-whiskey-030.jpg", ingredients: "Whiskey, honey syrup, lemon juice, soda" },
        { name: "Moscow Mule",imageUrl:"https://robbreport.com/wp-content/uploads/2021/02/moscow-mule-adobe-stock.jpg?w=1000",  ingredients: "Vodka, ginger beer, lime, mint" },
        { name: "Dark And Stormy", imageUrl:"https://www.allrecipes.com/thmb/mp-JRD5STdLyWos1Kgly0elXZOA=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/222547dark-n-stormy-cocktailFranceC4x3-fa7295a9367d4911ba65a7c45e4179e8.jpg", ingredients: "Dark rum, ginger beer, lime juice" },
        { name: "Americano", imageUrl:"https://umamigirl.com/wp-content/uploads/2022/08/Americano-Cocktail-Umami-Girl-1200.jpg", ingredients: "Campari, sweet vermouth, soda, orange twist" },
        { name: "Pornstar Martini",imageUrl:"https://www.kitchensanctuary.com/wp-content/uploads/2023/10/Pornstar-Martini-square-FS.jpg",  ingredients: "Vodka, vanilla syrup, lime juice, passion fruit, prosecco" },
        { name: "Paper Plane", imageUrl:"https://abeautifulmess.com/wp-content/uploads/2024/01/Paper-Plane-Cocktail-1-1.jpg", ingredients: "Whiskey, aperol, lemon juice, amaro liqueur" },
        { name: "Watermelon Cooler", imageUrl:"https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/watermelon_cooler_57906_16x9.jpg", ingredients: "Vodka, watermelon, lime, sugar, soda" },
        { name: "Gin Fizz", imageUrl:"https://www.thespruceeats.com/thmb/upWyM_vQBImTo3tBDaAhalkxYtc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-gin-fizz-recipe-759670-hero-images-3-557ae281ea0f42efb959e5a8458dfa85.jpg", ingredients: "Gin, lemon, egg white, soda, sugar" },
        { name: "Gin Basil Smash", imageUrl: "https://punchdrink.com/wp-content/uploads/2021/06/Social-Modern-Classic-Gin-Basil-Smash-Cocktail-Recipe.jpg", ingredients: "Gin, basil, mint, lemon juice, simple syrup" },
      ];

    for (const cocktail of cocktails) {
        await prisma.cocktail.create({
            data: cocktail,
        })
    }

    console.log("Seeding completed.")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })