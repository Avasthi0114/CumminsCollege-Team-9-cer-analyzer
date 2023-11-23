# import csv

# def read_exchange_rates(file_path):
#     with open(file_path, newline='') as csvfile:
#         reader = csv.reader(csvfile)
#         headers = next(reader)  # Read the headers
#         exchange_rates = {currency: [] for currency in headers[1:]}

#         for row in reader:
#             for i, rate in enumerate(row[1:]):
#                 exchange_rates[headers[i + 1]].append(float(rate))

#     return headers, exchange_rates

# def convert_currency(amount, from_currency, to_currency, exchange_rates):
#     from_index = headers.index(from_currency)
#     to_index = headers.index(to_currency)

#     from_rates = exchange_rates[from_currency]
#     to_rates = exchange_rates[to_currency]

#     conversion_rate = to_rates[0] / from_rates[0]
#     converted_amount = amount * conversion_rate

#     return converted_amount

# if __name__ == "__main__":
#     file_path = 'Exchange_Rate_Report_2012.csv'  # Replace with the actual path to your CSV file
#     headers, exchange_rates = read_exchange_rates(file_path)

#     amount = float(input("Enter the amount in USD: "))
#     from_currency = 'U.S. dollar   (USD)'  # Assuming the amount is in USD
#     to_currency = input("Enter the currency to convert to: ")

#     converted_amount = convert_currency(amount, from_currency, to_currency, exchange_rates)

#     print(f"Converted Amount: {converted_amount} {to_currency}")
