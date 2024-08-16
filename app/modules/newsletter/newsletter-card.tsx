import {Container} from '~/components/container';
import {NewsletterDialogButton} from './newsletter-dialog-button';

export default function NewsletterCard() {
  return (
    <Container>
      <div>
        <div>
          <h3>Join our growing Petrol Head Community</h3>
          <p>
            Get the latest news in engine technology straight to your inbox with
            our free monthly newsletter
          </p>
        </div>
        <div>
          <NewsletterDialogButton />
        </div>
      </div>
    </Container>
  );
}
