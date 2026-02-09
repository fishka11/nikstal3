export default function GoogleMap() {
  return (
    <div className="mb-24">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d64808.64074004816!2d19.068628271342487!3d50.241871372559054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716c51978b0b747%3A0xc066a9014c8442d1!2sNikstal%20-skup%20z%C5%82omu%2C%20metali%20kolorowych%2C%20surowc%C3%B3w%20wt%C3%B3rnych%20-%20Mys%C5%82owice%20woj.%20%C5%9Bl%C4%85skie!5e0!3m2!1spl!2spl!4v1686932905014!5m2!1spl!2spl"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}