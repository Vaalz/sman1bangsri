<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('keuangan', function (Blueprint $table) {
            if (!Schema::hasColumn('keuangan', 'tanggal')) {
                $table->date('tanggal')->nullable()->after('judul');
            }
        });

        if (Schema::hasColumn('keuangan', 'tahun')) {
            DB::table('keuangan')
                ->whereNotNull('tahun')
                ->update([
                    'tanggal' => DB::raw("STR_TO_DATE(CONCAT(tahun, '-01-01'), '%Y-%m-%d')"),
                ]);

            Schema::table('keuangan', function (Blueprint $table) {
                $table->dropColumn('tahun');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('keuangan', function (Blueprint $table) {
            if (!Schema::hasColumn('keuangan', 'tahun')) {
                $table->integer('tahun')->nullable()->after('judul');
            }
        });

        if (Schema::hasColumn('keuangan', 'tanggal')) {
            DB::table('keuangan')
                ->whereNotNull('tanggal')
                ->update([
                    'tahun' => DB::raw('YEAR(tanggal)'),
                ]);

            Schema::table('keuangan', function (Blueprint $table) {
                $table->dropColumn('tanggal');
            });
        }
    }
};
