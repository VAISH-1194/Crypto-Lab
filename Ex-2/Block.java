import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.Scanner;

public class Block 
{
    private int index;
    private long timestamp;
    private String previousHash;
    private String hash;
    private String data;
    private int nonce;

    public Block(int index, String previousHash, String data) 
    {
        this.index = index;
        this.timestamp = new Date().getTime();
        this.previousHash = previousHash;
        this.data = data;
        this.nonce = 0;
        this.hash = calculateHash();
    }

    public String calculateHash() 
    {
        try 
        {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            String input = index + timestamp + previousHash + data + nonce;
            byte[] hashBytes = digest.digest(input.getBytes());
            StringBuilder hexString = new StringBuilder();
            for (byte hashByte : hashBytes) 
            {
                String hex = Integer.toHexString(0xff & hashByte);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } 
        catch (NoSuchAlgorithmException e) 
        {
            e.printStackTrace();
        }
        return null;
    }

    public void mineBlock(int difficulty) 
    {
        String target = new String(new char[difficulty]).replace('\0', '0');
        while (!hash.substring(0, difficulty).equals(target)) 
        {
            nonce++;
            hash = calculateHash();
        }
        System.out.println("Block mined: " + hash);
    }

    public static void main(String[] args) 
    {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter Block Index: ");
        int index = scanner.nextInt();
        scanner.nextLine();
        System.out.print("Enter Previous Hash: ");
        String prevHash = scanner.nextLine();
        System.out.print("Enter Data: ");
        String data = scanner.nextLine();
        Block block = new Block(index, prevHash, data);
        System.out.println("\nCalculating Hash...");
        System.out.println("Initial Hash: " + block.calculateHash());
        System.out.println("Mining Block...");
        block.mineBlock(1);
        System.out.println("\nBlock Details:");
        System.out.println("Block Index: " + block.index);
        System.out.println("Timestamp: " + block.timestamp);
        System.out.println("Previous Hash: " + block.previousHash);
        System.out.println("Current Hash: " + block.hash);
        System.out.println("Data: " + block.data);
        scanner.close();
    }
}