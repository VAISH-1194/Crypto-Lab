import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class MerkleTree {
    private List<String> transactions;
    private List<String> merkleTree;

    public MerkleTree(List<String> transactions) {
        this.transactions = buildInitialHashes(transactions); // Hash leaf nodes
        this.merkleTree = buildMerkleTree(this.transactions);
    }

    // Convert raw transaction strings to SHA-256 hashes (leaf nodes)
    private List<String> buildInitialHashes(List<String> rawTransactions) {
        List<String> hashedTransactions = new ArrayList<>();
        for (String tx : rawTransactions) {
            hashedTransactions.add(calculateHash(tx));
        }
        return hashedTransactions;
    }

    private String calculateHash(String data) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(data.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte hashByte : hashBytes) {
                String hex = Integer.toHexString(0xff & hashByte);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }

    private List<String> buildMerkleTree(List<String> hashedLeaves) {
        List<String> merkleTree = new ArrayList<>(hashedLeaves);

        int levelOffset = 0;
        for (int levelSize = hashedLeaves.size(); levelSize > 1; levelSize = (levelSize + 1) / 2) {
            for (int left = 0; left < levelSize; left += 2) {
                int right = Math.min(left + 1, levelSize - 1);
                String leftHash = merkleTree.get(levelOffset + left);
                String rightHash = merkleTree.get(levelOffset + right);
                String parentHash = calculateHash(leftHash + rightHash);
                merkleTree.add(parentHash);
            }
            levelOffset += levelSize;
        }
        return merkleTree;
    }

    public List<String> getMerkleTree() {
        return merkleTree;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<String> transactions = new ArrayList<>();

        System.out.print("Enter the number of transactions: ");
        int n = scanner.nextInt();
        scanner.nextLine(); // Consume newline

        for (int i = 1; i <= n; i++) {
            System.out.print("Enter transaction " + i + ": ");
            transactions.add(scanner.nextLine());
        }

        MerkleTree tree = new MerkleTree(transactions);
        System.out.println("\nMerkle Tree Hashes:");
        for (String hash : tree.getMerkleTree()) {
            System.out.println(hash);
        }

        scanner.close();
    }
}