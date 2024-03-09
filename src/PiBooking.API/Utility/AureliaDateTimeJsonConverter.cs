namespace PiBooking.API.Utility;
using System;
using System.Buffers;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;



public class AureliaDateTimeJsonConverter : JsonConverter<DateTime>
{
    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType == JsonTokenType.String)
        {
            var dateString = reader.GetString();
            if (DateTime.TryParseExact(dateString, "M/d/yyyy h:mm tt", null, DateTimeStyles.None, out var parsedDate))
            {
                return parsedDate;
            }
        }

        throw new JsonException("Invalid date format.");
    }

    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString("M/d/yyyy h:mm tt"));
    }
}

