<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $address = $_POST['address'];
    $units = $_POST['units'];

    // Insert consumer
    $stmt = $conn->prepare("INSERT INTO consumer (name, address) VALUES (?, ?)");
    $stmt->bind_param("ss", $name, $address);
    $stmt->execute();
    $consumer_id = $stmt->insert_id;

    // Calculate bill
    $total = 0;
    $u = $units;

    if ($u > 250) {
        $total += ($u - 250) * 6.5;
        $u = 250;
    }
    if ($u > 150) {
        $total += ($u - 150) * 5.2;
        $u = 150;
    }
    if ($u > 50) {
        $total += ($u - 50) * 4.0;
        $u = 50;
    }
    $total += $u * 3.5;

    // Insert bill
    $stmt = $conn->prepare("INSERT INTO billing (consumer_id, units_consumed, total_amount) VALUES (?, ?, ?)");
    $stmt->bind_param("iid", $consumer_id, $units, $total);
    $stmt->execute();

    echo json_encode([
        "message" => "Bill calculated successfully",
        "consumer_id" => $consumer_id,
        "units_consumed" => $units,
        "total_amount" => number_format($total, 2)
    ]);
}
?>
