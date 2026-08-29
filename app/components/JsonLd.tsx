import {useNonce} from '@shopify/hydrogen';

type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function JsonLd({data}: JsonLdProps) {
  const nonce = useNonce();
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item) => {
        const key =
          typeof item['@type'] === 'string'
            ? item['@type']
            : JSON.stringify(item);
        return (
          <script
            key={key}
            type="application/ld+json"
            nonce={nonce || undefined}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{__html: JSON.stringify(item)}}
          />
        );
      })}
    </>
  );
}
