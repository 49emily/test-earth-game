const { View, StyleSheet, Text } = require("react-native");
const { List } = require("react-native-paper");

// Sample data from an API response
// const apiResponse = {
//   items: [
//     {
//       id: "OUTSHINE PINEAPPLEPC",
//       name: "Outshine Pineapple Popsicle",
//       kg: 0.8,
//       is_food: true,
//       score: 1.78,
//     },
//     { id: "S FARMS SALAD KIT", name: "Salad Kit", kg: 0.3, is_food: true, score: 0.61 },
//     { id: "STUFFED MUSHROOMS", name: "Stuffed Mushrooms", kg: 0.2, is_food: true, score: 1.66 },
//     { id: "JALAPEND POPPER", name: "Jalapeno Poppers", kg: 0.15, is_food: true, score: 4.01 },
//     { id: "POTATO SALAD RED", name: "Red Potato Salad", kg: 0.5, is_food: true, score: 1.66 },
//   ],
// };

const History = ({ items }) => {
  // Calculate the total carbon score
  const totalScore = items
    .filter((item) => item.score !== null)
    .reduce((acc, item) => acc + item.score * item.kg, 0);

  // Calculate stars based on total carbon score (lower score = more stars)
  const getStars = (score) => {
    const maxScore = 10; // Define maximum score for scaling purposes
    const starCount = 5 - Math.floor((score / maxScore) * 5); // Inverse relationship
    return "⭐".repeat(starCount) + " ".repeat(5 - starCount);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>History</Text>
      <List.Section>
        <List.Subheader style={styles.subheader}>Items</List.Subheader>
        {items.map((item, index) => (
          <List.Item
            key={item.id}
            title={item.name}
            description={`ID: ${item.id}, Weight: ${item.kg} kg`}
            left={(props) => <List.Icon {...props} icon="food" color="#6200ee" />}
            right={(props) => (
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreLabel}>Carbon Score</Text>
                <Text style={[styles.score, { color: props.color }]}>
                  {(item.score * item.kg).toFixed(2)}
                </Text>
              </View>
            )}
            titleStyle={styles.title}
            descriptionStyle={styles.description}
            onPress={() => console.log(`Pressed on ${item.name}`)}
          />
        ))}
        {/* Display the total carbon score */}
        <View style={styles.totalScoreContainer}>
          <Text style={styles.totalScoreText}>Grand Total Carbon Score:</Text>
          <Text style={styles.totalScore}>{totalScore.toFixed(2)} CO2 kg</Text>
          <Text style={styles.stars}>{getStars(totalScore)}</Text>
        </View>
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    padding: 10,
    paddingTop: 80, // Increased padding at the top
  },
  header: {
    fontSize: 22,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subheader: {
    fontSize: 20,
    color: "#333",
    backgroundColor: "#e0e0e0",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  title: {
    color: "#6200ee",
    fontWeight: "bold",
    fontSize: 18,
  },
  description: {
    color: "#666",
    fontSize: 14,
  },
  scoreContainer: {
    alignItems: "flex-end",
    marginRight: 10,
  },
  scoreLabel: {
    fontSize: 12,
    color: "#888",
    fontWeight: "bold",
  },
  score: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  totalScoreContainer: {
    backgroundColor: "#e8eaf6",
    borderRadius: 20,
    padding: 10,
    marginVertical: 20,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  totalScoreText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  totalScore: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6200ee",
  },
  stars: {
    marginTop: 5,
    fontSize: 28,
    fontWeight: "bold",
    color: "#f4c20d",
  },
});

export default History;
