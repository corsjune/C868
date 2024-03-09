namespace PiBooking.API.Utility;
using System;
using System.Buffers;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;



public class AureliaTimeOnlyJsonConverter : JsonConverter<TimeOnly>
{
    public override TimeOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType == JsonTokenType.String)
        {
            var dateString = reader.GetString();
            if (TimeOnly.TryParseExact(dateString, "h:mm tt", null, DateTimeStyles.None, out var parsedDate))
            {
                return parsedDate;
            }
        }

        throw new JsonException("Invalid date format.");
    }

    public override void Write(Utf8JsonWriter writer, TimeOnly value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString("h:mm tt"));
    }
}

