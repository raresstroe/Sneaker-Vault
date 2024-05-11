<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MyTestEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(
        private $name,
        private $deliveryDate,
        private $orderDate,
        private $id,
        private $paymentMethod,
        private $address,
        private $postalCode,
        private $city,
        private $total,
        private $phone,
    ) {
        //
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: 'Comanda Ta',
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            view: 'mail.test-email',
            with: [
                'name' => $this->name,
                'deliveryDate' => $this->deliveryDate,
                'orderDate' => $this->orderDate,
                'id' => $this->id,
                'paymentMethod' => $this->paymentMethod,
                'address' => $this->address,
                'postalCode' => $this->postalCode,
                'city' => $this->city,
                'total' => $this->total,
                'phone' => $this->phone,
            ],
        );
    }
}
