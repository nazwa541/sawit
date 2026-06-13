<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pengirimen', function (Blueprint $table) {
            $table->id();

            $table->foreignId('mobil_id')
                ->constrained('mobils')
                ->cascadeOnDelete();

            $table->foreignId('lahan_id')
                ->constrained('lahans')
                ->cascadeOnDelete();

            $table->foreignId('pekerja_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->timestamp('waktu_berangkat');

            $table->integer('berat_netto_kg')
                ->nullable();

            $table->text('catatan')->nullable();

            $table->enum('status', [
                'perjalanan',
                'menunggu_nota',
                'selesai'
            ])->default('perjalanan');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengirimen');
    }
};
