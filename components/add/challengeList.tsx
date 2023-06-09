export const challengeList = [
    "Enter your own",
    "Aikido",
    "Archery",
    "Badminton",
    "Barre",
    "Baseball",
    "Basketball",
    "Beach Volleyball",
    "Billards",
    "Bocce",
    "Bowling",
    "Boxing",
    "Brazilian Jiu-Jitsu",
    "Cheer",
    "Chess Boxing",
    "Climbing",
    "Core Training",
    "Cricket",
    "Cross-fit",
    "Cup Stacking",
    "Cycle",
    "Dance",
    "Dodgeball",
    "Dressage",
    "E-Sports",
    "Elliptical",
    "Fencing",
    "Fish",
    "Flexibility",
    "Football (American)",
    "Golf",
    "Gymnastics",
    "Hammer Throw",
    "Handball",
    "High Dive",
    "High Jump",
    "HIIT",
    "Hike",
    "Hockey",
    "Horse Racing",
    "Ice Skate",
    "Judo",
    "Karate",
    "Kickboxing",
    "Krav Maga",
    "Kung Fu",
    "Lacrosse",
    "Luge",
    "Martial Arts",
    "Netball",
    "Pickleball",
    "Pilates",
    "Pole Dance",
    "Polo",
    "Pool",
    "Quidditch",
    "Racquetball",
    "Rings (Gymnastics)",
    "Rock Climb",
    "Rodeo",
    "Rope Climb",
    "Rowing",
    "Rugby",
    "Run",
    "Sail",
    "Shot put",
    "Shuffleboard",
    "Skateboard",
    "Ski",
    "Sled",
    "Soccer",
    "Softball",
    "Speed Skate",
    "Spin",
    "Sport Kite",
    "Squash",
    "Stairs",
    "Strech",
    "Strength Training",
    "Stretching",
    "Surfing",
    "Swim",
    "Table Tennis",
    "Taekwondo",
    "Tennis",
    "Track and Field",
    "Treadmill",
    "Triathlon",
    "Volleyball",
    "Walk",
    "Water Polo",
    "Weightlifting (Lower Body)",
    "Weightlifting (Upper Body)",
    "Weightlifting",
    "Wrestling",
    "Yoga"
]

let mappedChallengeList = [];

// for (const item, index in challengeList) {
//     // mappedChallengeList.push(
//     //     {label: sport, value: sport}
//     // )
//     console.log(sport);
// }

challengeList.forEach(function(item, index){
    mappedChallengeList.push(
        {label: item, value: item}
    )
})


export default mappedChallengeList;